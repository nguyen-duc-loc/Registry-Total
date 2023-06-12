import { useState } from "react";
import CentresList from "../components/Content/Centre/CentresList";
import CreateCentre from "../components/Content/Centre/CreateCentre";
import { useAuthUser } from "react-auth-kit";
import Unauthorized from "../components/UI/Unauthorized";

const CentresPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return admin ? (
    <div
      style={{
        maxWidth: "65rem",
        margin: "auto",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CreateCentre loading={loading} provinces={provinces} />
      <CentresList setProvinces={setProvinces} setLoading={setLoading} />
    </div>
  ) : (
    <Unauthorized />
  );
};

export default CentresPage;
