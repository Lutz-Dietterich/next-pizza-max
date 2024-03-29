import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import mongodb from "@/utils/mongodb";
import Produkt from "@/models/Produkt";
import produktStore from "@/zustand/produktStore";
import warenkorbStore from "@/zustand/warenkorbStore";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Produktseite({ produkt }) {
  const router = useRouter();

  const {
    setInitialProduktState,
    preis,
    setPreis,
    extras,
    setExtras,
    menge,
    setMenge,
  } = produktStore((state) => ({
    preis: state.preis,
    extras: state.extras,
    menge: state.menge,
    setPreis: state.setPreis,
    setExtras: state.setExtras,
    setMenge: state.setMenge,
    setInitialProduktState: state.setInitialProduktState,
  }));

  useEffect(() => {
    if (produkt) {
      setInitialProduktState({
        preis: produkt.price,
        extras: [],
        menge: 1,
      });
    }
  }, [produkt, setInitialProduktState]);

  const addExtra = (e, extra) => {
    const checked = e.target.checked;
    if (checked) {
      setPreis(preis + extra.price);
      setExtras([...extras, extra]);
    } else {
      setPreis(preis - extra.price);
      setExtras(extras.filter((alleExtras) => alleExtras._id !== extra._id));
    }
  };

  const { addToCart } = warenkorbStore((state) => ({
    addToCart: state.addToCart,
  }));

  const handleAddToCart = () => {
    const _id = uuidv4();
    const produktZumHinzufügen = {
      ...produkt,
      preis: preis,
      extras: extras,
      menge: menge,
      _id: _id,
    };

    addToCart(produktZumHinzufügen);
    router.push("/warenkorb");
  };

  if (!produkt) {
    return (
      <>
        <div className="p-flex col justify-content-center align-items-center">
          <h2>Produkt nicht vorhanden!</h2>
        </div>
      </>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: "-100%" }}
      animate={{ opacity: 1, y: "0" }}
      transition={{ ease: "easeOut", duration: 0.5 }}
      exit={{ opacity: 0 }}
    >
      <div>
        <Link href={"/"} className="text-dark none">
          ← zurück zur Übersicht
        </Link>
      </div>
      <div className="row row-cols-2 mt-5">
        <div>
          <Image
            className="rounded-3"
            src={produkt.picture}
            alt="{produkt.name}"
            width={600}
            height={600}
            layout="responsive"
          />
        </div>
        <div>
          <h1 className="ms-3 mb-5">{produkt.name}</h1>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h2 className="text-danger">{preis.toFixed(2)} €</h2>
            </ListGroupItem>
            <ListGroupItem>{produkt.description}</ListGroupItem>
            <ListGroupItem className="mt-2">
              {produkt.extras.length ? "Extras: " : <p></p>} <br />
              {produkt.extras.map((extra) => (
                <span key={extra._id}>
                  {extra.text} {extra.price.toFixed(2)}€
                  <input
                    className="form-check-input mx-2"
                    type="checkbox"
                    id="extra.text"
                    onChange={(e) => addExtra(e, extra)}
                  />
                </span>
              ))}
            </ListGroupItem>
            <ListGroupItem>
              <input
                className="form-control w-50"
                type="number"
                value={menge}
                min={1}
                max={100}
                onChange={(e) => setMenge(e.target.value)}
              ></input>
            </ListGroupItem>
            <ListGroupItem>
              <div className="row shadow">
                <Button variant="danger" onClick={handleAddToCart}>
                  zum Warenkorb hinzufügen
                </Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </motion.div>
  );
}

export async function getServerSideProps(context) {
  const url = context.params.url;
  await mongodb.dbConnect();
  const produkt = await Produkt.findOne({ url }).lean();
  return {
    props: {
      produkt: JSON.parse(JSON.stringify(produkt)),
    },
  };
}
