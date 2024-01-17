import { Table, Button, CloseButton } from "react-bootstrap";
import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";

export default function Bestellung({ bestellungen }) {
  const router = useRouter();

  const status = ["Eingegangen", "Zubereitung", "Unterwegs", "Ausgeliefert"];

  const statusUpdate = async (id, aktuellerstatus) => {
    try {
      if (aktuellerstatus <= 2) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bestellungen/` + id,
          {
            status: aktuellerstatus + 1,
          }
        );
        router.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteData = async (id) => {
    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bestellungen/` + id
      );
      router.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="mt-5">
      <h1>Admin Backend</h1>
      <div className="row mt-4">
        <div className="col-12">
          <Table hover responsive>
            <thead>
              <tr>
                <th>Bestell Nr.</th>
                <th>Kunde </th>
                <th>Adresse</th>
                <th>Status</th>
                <th>
                  <CloseButton disabled />
                </th>
              </tr>
            </thead>
            {bestellungen.map((bestellung) => (
              <tbody key={bestellung._id}>
                <tr>
                  <td>
                    <Link href={`/bestellungen/${bestellung._id}`}>
                      {bestellung._id}
                    </Link>
                  </td>
                  <td>{bestellung.kunde}</td>
                  <td>{bestellung.adresse}</td>
                  <td>
                    <Button
                      onClick={() =>
                        statusUpdate(bestellung._id, bestellung.status)
                      }
                    >
                      {status[bestellung.status]}
                    </Button>
                  </td>
                  <td>
                    <CloseButton onClick={() => deleteData(bestellung._id)} />
                  </td>
                </tr>
              </tbody>
            ))}
          </Table>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  const meinCookie = ctx.req?.cookies || "";
  if (meinCookie.token !== process.env.TOKEN) {
    return {
      redirect: {
        destination: "/backend/login",
        permant: false,
      },
    };
  } else {
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bestellungen`
    );
    return {
      props: {
        bestellungen: res.data,
      },
    };
  }
}

// export async function getServerSideProps() {
//   const res = await axios.get(
//     `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/bestellungen`
//   );
//   return {
//     props: {
//       bestellungen: res.data,
//     },
//   };
// }
