import { useState } from "react";
import ViewCentre from "../components/Content/Centre/ViewCentre";
import PageNotExist from "../components/UI/PageNotExist";
import { useAuthUser } from "react-auth-kit";
import Unauthorized from "../components/UI/Unauthorized";

const ViewCentrePage = () => {
  const [error, setError] = useState(false);
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return error ? (
    <PageNotExist />
  ) : admin ? (
    <ViewCentre setError={setError} />
  ) : (
    <Unauthorized />
  );
};

export default ViewCentrePage;
