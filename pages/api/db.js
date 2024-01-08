import mongodb from "@/utils/mongodb";
import jsondb from "@/jsondb/produkte";
import Produkt from "@/models/Produkt";

export default async function handler(req, res) {
  try {
    await mongodb.dbConnect();
    await Produkt.deleteMany();
    await Produkt.insertMany(jsondb.produkte);
    await mongodb.dbDisconnect();
    res.status(200).json({ text: "Daten gespeichert" });
  } catch (error) {
    console.error("Fehler bei der Datenbankoperation:", error);
    res.status(500).json({ error: "Serverfehler" });
  }
}
