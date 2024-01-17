import ProductList from "@/components/ProductList";
import Slider from "@/components/Slider";
import Produkt from "@/models/Produkt";
import mongodb from "@/utils/mongodb";
import { motion } from "framer-motion";

export default function Home({ produkte }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: "0" }}
      transition={{ ease: "easeOut", duration: 1 }}
    >
      <Slider />
      <ProductList produkte={produkte} />
    </motion.div>
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
