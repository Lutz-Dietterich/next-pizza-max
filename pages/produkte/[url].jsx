import { useRouter } from "next/router";
import jsondb from "@/jsondb/produkte";

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
      <div className="mt-3">
        <h1>{produkt.name}</h1>
        <div></div>
      </div>
    </>
  );
}
