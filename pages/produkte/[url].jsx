import { useRouter } from "next/router";
import jsondb from "@/jsondb/produkte";
import Link from "next/link";
import Image from "next/image";
import { Row, Col } from "react-bootstrap";

import { ListGroup } from "react-bootstrap";

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
      <Row className="mt-5">
        <Col sm>
          <Image
            className="rounded-3"
            src={produkt.picture}
            alt="{produkt.name}"
            width={600}
            height={600}
            layout="responsive"
          />
        </Col>
        <Col sm>
          <h1>hallo</h1>
        </Col>
      </Row>
    </>
  );
}
