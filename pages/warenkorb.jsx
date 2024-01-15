import { Table, CloseButton, Button, Card } from "react-bootstrap";
import Image from "next/image";
import warenkorbStore from "@/zustand/warenkorbStore";
import { useEffect, useState } from "react";
import Link from "next/link";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import axios from "axios";
import { useRouter } from "next/router";

export default function Warenkorb() {
  const [kasse, setKasse] = useState(false);
  const router = useRouter();

  const {
    warenkorb,
    gesamtbetrag,
    berechneGesamtbetrag,
    removeFromCard,
    removeAll,
  } = warenkorbStore((state) => ({
    warenkorb: state.warenkorb,
    gesamtbetrag: state.gesamtbetrag,
    berechneGesamtbetrag: state.berechneGesamtbetrag,
    removeFromCard: state.removeFromCard,
    removeAll: state.removeAll,
  }));

  useEffect(() => {
    berechneGesamtbetrag();
  }, [warenkorb, berechneGesamtbetrag]);

  const handleRemove = (artikelID) => {
    removeFromCard(artikelID);
    berechneGesamtbetrag();
  };

  const initialOptions = {
    clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
    currency: "EUR",
    intent: "capture",
  };

  const style = { layout: "vertical", height: 30 };

  const handleOrder = async (data) => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/bestellungen",
        data
      );
      if (res.status === 201) {
        removeAll();
        router.push(`/bestellungen/${res.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const createOrder = (data, actions) => {
    return actions.order.create({
      purchase_units: [
        {
          amount: {
            value: gesamtbetrag.toFixed(2), // Der Gesamtbetrag aus Ihrem Warenkorb-Zustand
          },
        },
      ],
    });
  };

  const onApprove = (data, actions) => {
    return actions.order.capture().then(function (details) {
      console.log(details.purchase_units[0].shipping);

      const kunde = details.purchase_units[0].shipping;
      handleOrder({
        kunde: kunde.name.full_name,
        adresse:
          kunde.address.address_line_1 + ", " + kunde.address.admin_area_2,
        betrag: gesamtbetrag,
        status: 0,
        zahlung: 1,
        produkte: warenkorb.map((artikel) => ({
          name: artikel.name,
          menge: artikel.menge,
          extras: artikel.extras.map((extra) => extra.text),
        })),
      });
    });
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
                    <Card.Title className="mb-4">
                      {gesamtbetrag.toFixed(2)} €
                    </Card.Title>
                    {!kasse ? (
                      <Button
                        onClick={() => setKasse(!kasse)}
                        className="w-100"
                        variant="primary"
                      >
                        Zur Kasse
                      </Button>
                    ) : (
                      <PayPalScriptProvider options={initialOptions}>
                        <PayPalButtons
                          createOrder={createOrder}
                          onApprove={onApprove}
                          style={style}
                        />
                      </PayPalScriptProvider>
                    )}
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
