import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import warenkorbStore from "@/zustand/warenkorbStore";
import { useEffect } from "react";
import Link from "next/link";

export default function Warenkorb() {
  const { warenkorb, gesamtbetrag, berechneGesamtbetrag, removeFromCard } =
    warenkorbStore((state) => ({
      warenkorb: state.warenkorb,
      gesamtbetrag: state.gesamtbetrag,
      berechneGesamtbetrag: state.berechneGesamtbetrag,
      removeFromCard: state.removeFromCard,
    }));

  useEffect(() => {
    berechneGesamtbetrag();
  }, [warenkorb, berechneGesamtbetrag]);

  const handleRemove = (artikelID) => {
    removeFromCard(artikelID);
    berechneGesamtbetrag();
  };

  return (
    <div className="mt-5">
      {warenkorb.length === 0 ? (
        <h2>Der Warenkorb ist leer!</h2>
      ) : (
        <div>
          <h1 className="">Warenkorb</h1>
          <div className="row mt-4">
            <div className="col-9">
              <Table hover responsive>
                <thead>
                  <tr>
                    <th>Bild</th>
                    <th>Name </th>
                    <th>Extras</th>
                    <th>Menge</th>
                    <th>Betrag</th>
                    <th>
                      <CloseButton disabled />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {warenkorb.map((artikel) => (
                    <tr key={artikel.id}>
                      <td>
                        <Image
                          src={artikel.picture}
                          alt={artikel.name}
                          width={50}
                          height={50}
                        />
                      </td>
                      <td>
                        <Link href={`/produkte/${artikel.url}`}>
                          <h5 className="text-danger">{artikel.name}</h5>
                        </Link>
                      </td>
                      <td>
                        {artikel.extras && artikel.extras.length > 0 ? (
                          artikel.extras.map((extra) => (
                            <p className="m-0" key={extra._id}>
                              {extra.text}
                            </p>
                          ))
                        ) : (
                          <p>--</p>
                        )}
                      </td>

                      <td>{artikel.menge}</td>
                      <td>{artikel.preis.toFixed(2)} €</td>
                      <td>
                        <Button
                          className="btn-sm"
                          onClick={() => {
                            handleRemove(artikel._id);
                          }}
                        >
                          ❌
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <div className="col-3 p-2">
              <div className="shadow">
                <Card>
                  <Card.Header as={"h5"}>Gesamt</Card.Header>
                  <Card.Body className="text-center">
                    <Card.Title>{gesamtbetrag.toFixed(2)} €</Card.Title>
                    <Button className="w-100" variant="primary">
                      Zur Kasse
                    </Button>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
