import Link from "next/link";
import Image from "next/image";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";
import mongodb from "@/utils/mongodb";
import Produkt from "@/models/Produkt";
import { useState } from "react";

export default function Produktseite({ produkt }) {
  const [preis, setPreis] = useState(produkt?.price);
  const [extras, setExtras] = useState([]);
  const [menge, setMenge] = useState(1);

  const addExtra = (e, extra) => {
    console.log(e.target);
    const checked = e.target.checked;
    if (checked) {
      setPreis(preis + extra.price);
      setExtras([...extras, extra]);
    } else {
      setPreis(preis - extra.price);
      setExtras(extras.filter((alleExtras) => alleExtras._id !== extra._id));
    }
  };

  console.log(menge);

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
    <>
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
                <Button variant="danger">zum Warenkorb hinzufügen</Button>
              </div>
            </ListGroupItem>
          </ListGroup>
        </div>
      </div>
    </>
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
