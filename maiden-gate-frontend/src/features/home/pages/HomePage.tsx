import { useEffect } from "react";
import api from "../../../services/api";

export default function HomePage() {
  useEffect(() => {
    api
      .get("/marcas")
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return <h1>Home</h1>;
}
