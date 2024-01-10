import { Card, Button } from "react-bootstrap";
import Link from "next/link";
import styled from "styled-components";

export default function ProductList({ produkte }) {
  return (
    <div>
      <div className=" row justify-content-center my-5">
        {produkte?.map((produkt) => (
          <div
            key={produkt.name}
            className="mt-3  col-12 col-md-6 col-lg-4 col-xl-3"
          >
            <StyledCard>
              <Link href={`/produkte/${produkt.url}`} passHref>
                <Card.Img variant="top" src={produkt.picture} />
              </Link>
              <Card.Body>
                <Card.Title>
                  {produkt.name} {produkt.price} €
                </Card.Title>
                <Card.Text>{produkt.description}</Card.Text>
              </Card.Body>
              <Link href={`/produkte/${produkt.url}`} passHref>
                <Button className="w-100" variant="danger">
                  Bestellen
                </Button>
              </Link>
            </StyledCard>
          </div>
        ))}
      </div>
      <br />
    </div>
  );
}

const StyledCard = styled(Card)`
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);

  &:hover {
    transform: scale(1.02);
    transition: 0.5s;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.6);
  }
`;
