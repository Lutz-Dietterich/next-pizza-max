import Link from "next/link";
import Image from "next/image";
import { Badge } from "react-bootstrap";
import warenkorbStore from "@/zustand/warenkorbStore";

export default function Navigation() {
  const warenkorb = warenkorbStore((state) => state.warenkorb);

  return (
    <div className="shadow sticky-top px-4 py-2 mb-2 bg-danger">
      <div className="d-flex justify-content-between align-items-center">
        <Link href="/">
          <Image src="/img/logo.png" alt="Logo" width={180} height={75} />
        </Link>
        <Link href="/warenkorb" className="me-3">
          <div style={{ position: "relative" }}>
            <Image
              src="/img/warenkorb.png"
              alt="Warenkorb"
              width={30}
              height={30}
            />
            {warenkorb.length > 0 && (
              <Badge
                pill
                bg="success"
                style={{ position: "absolute", top: -8, left: -12 }}
              >
                {warenkorb.length}
              </Badge>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
