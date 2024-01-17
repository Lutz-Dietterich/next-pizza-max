import { Table, Spinner, Button, Card } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";

export default function Bestellung({ bestellung }) {
  const router = useRouter();
  const { nr } = router.query;

  let status;
  switch (bestellung?.status) {
    case 0:
      status = "Eingegangen";
      break;
    case 1:
      status = "Zubereitung";
      break;
    case 2:
      status = "Unterwegs";
      break;
    case 3:
      status = "Ausgeliefert";
      break;
  }

  if (nr !== bestellung?._id) {
    return (
      <div>
        <h2>Bestellung {nr} nicht vorhanden! </h2>
        <Button variant="primary" onClick={() => router.push("/")}>
          zurück zur Karte
        </Button>
      </div>
    );
  } else {
    return (
      <div className="mt-5">
        <h1>Bestellstatus</h1>
        <div className="row mt-4">
          <div className="col-9">
            <Table hover responsive>
              <thead>
                <tr>
                  <th>Bestell Nr.</th>
                  <th>Kunde </th>
                  <th>Adresse</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{nr}</td>
                  <td>{bestellung.kunde}</td>
                  <td>{bestellung.adresse}</td>
                  <td>
                    <span>{status}</span>
                    {bestellung.status < 3 ? (
                      <Spinner
                        className="ms-2"
                        animation="border"
                        variant={bestellung.status < 1 ? "warning" : "success"}
                        size="sm"
                      />
                    ) : (
                      <span> ✅</span>
                    )}
                  </td>
                </tr>
              </tbody>
            </Table>
            <Table hover responsive className="mt-5">
              <thead>
                <tr>
                  <th>Produktname</th>
                  <th>Extras </th>
                  <th>Menge</th>
                </tr>
              </thead>
              <tbody>
                {bestellung.produkte.map((produkt) => (
                  <tr key={produkt._id}>
                    <td>{produkt.name}</td>
                    <td>
                      {produkt.extras.map((extra) => (
                        <span key={extra._id}>
                          {extra}
                          <br />
                        </span>
                      ))}
                    </td>
                    <td>{produkt.menge}</td>
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
                  <Card.Title>{bestellung.betrag.toFixed(2)} €</Card.Title>
                  {bestellung.zahlung === 0 ? (
                    <Button className="w-100" variant="danger disabled">
                      offen
                    </Button>
                  ) : (
                    <Button className="w-100" variant="success disabled">
                      bezahlt
                    </Button>
                  )}
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export async function getServerSideProps({ params }) {
  const res = await axios.get(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bestellungen/${params.nr}`
  );
  return {
    props: {
      bestellung: res.data,
    },
  };
}
