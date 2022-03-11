import { setupApiClient } from "../services/api";
import { withSSRAuth } from "../utils/withSSRAuth";

export default function Profile() {
  return (
    <>
      <h1>Profile</h1>
    </>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiCLient = setupApiClient(ctx);
    await apiCLient.get("/me");
    return {
      props: {},
    };
  },
  {
    permissions: ["user.list"],
    roles: ["administrator"],
  }
);
