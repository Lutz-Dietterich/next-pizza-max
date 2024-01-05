import { Carousel } from "react-bootstrap";
import Image from "next/image";

export default function Slider() {
  return (
    <div className="mt-5 shadow-lg">
      <Carousel controls={false} indicators={false} fade={true}>
        <Carousel.Item>
          <Image
            className="d-bock w-100 rounded-3 img-fluid"
            src="/img/slider/burger.jpg"
            alt="Burger"
            width={2000}
            height={500}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-bock w-100 rounded-3 img-fluid"
            src="/img/slider/burrito.jpg"
            alt="burrito"
            width={2000}
            height={500}
          />
        </Carousel.Item>
        <Carousel.Item>
          <Image
            className="d-bock w-100 rounded-3 img-fluid"
            src="/img/slider/pizza.jpg"
            alt="Pizza"
            width={2000}
            height={500}
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
