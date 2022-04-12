import { useContext, useEffect } from "react";
import { Can } from "../components/Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupApiClient } from "../services/api";

import { api } from "../services/apiCLient";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Profile() {
  const { signOut } = useContext(AuthContext);
  const userCanSeeProfile = useCan({
    roles: ["administrator"],
  });

  useEffect(() => {
    api
      .get("/users")
      .then((response) => console.log(response.data))
      .catch((error) => console.log(error));
  });
  return (
    <>
      <h1>Profile</h1>

      <button onClick={signOut}>Sair</button>

      <Can permissions={["users.list"]}>
        <div>Componente com permissão </div>
      </Can>
    </>
  );
}

export const getServerSideProps = withSSRAuth(async (ctx) => {
  const apiCLient = setupApiClient(ctx);
  await apiCLient.get("/me");
  return {
    props: {},
  };
}, {});
