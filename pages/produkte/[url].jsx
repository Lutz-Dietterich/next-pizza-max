import { useRouter } from "next/router";
import jsondb from "@/jsondb/produkte";
import Link from "next/link";
import Image from "next/image";
import { ListGroup, ListGroupItem, Button } from "react-bootstrap";

export default function Produktseite() {
  const router = useRouter();
  const { url } = router.query;

  const produkt = jsondb.produkte.find((produkt) => produkt.url === url);

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
              <h2 className="text-danger">{produkt.price} €</h2>
            </ListGroupItem>
            <ListGroupItem>{produkt.description}</ListGroupItem>
            <ListGroupItem className="mt-2">
              Extras: <br /> doppelt
              <input className="form-check-input mx-2" type="checkbox" />
              extra Pommes{" "}
              <input className="form-check-input mx-2" type="checkbox" />
            </ListGroupItem>
            <ListGroupItem>
              <input
                className="form-control w-50"
                type="number"
                placeholder="1"
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
