import Layout from "@/components/Layout";
import "react-toastify/dist/ReactToastify.css";
import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/styles/custom.scss";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Layout>
        <ToastContainer />
        <Component {...pageProps} />
      </Layout>
    </>
  );
}
