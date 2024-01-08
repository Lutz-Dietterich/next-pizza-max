import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import Produkt from "@/models/Produkt";
import mongodb from "@/utils/mongodb";

export default function Home({ produkte }) {
  return (
    <>
      <Slider />
      <ProductList produkte={produkte} />
    </>
  );
}

export async function getServerSideProps() {
  await mongodb.dbConnect();
  const produkte = await Produkt.find({}).lean();
  return {
    props: {
      produkte: JSON.parse(JSON.stringify(produkte)),
    },
  };
}
