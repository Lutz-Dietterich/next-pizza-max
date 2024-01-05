import { Table, CloseButton, Button } from "react-bootstrap";
import Image from "next/image";

export default function Warenkorb() {
  return (
    <div className="mt-5">
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
              <tr className=" align-items-center">
                <td>
                  <Image
                    src={"/img/products/cola.jpg"}
                    alt="cola"
                    width={50}
                    height={50}
                  />
                </td>
                <td>Cola</td>
                <td>doppelt</td>
                <td>1</td>
                <td>1,99</td>
                <td>
                  <Button className="btn-sm">❌</Button>
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
        <div className="col-3 p-2">Bezahlen</div>
      </div>
    </div>
  );
}
