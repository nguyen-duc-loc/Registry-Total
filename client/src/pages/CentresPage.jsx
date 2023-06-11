import { useState } from "react";
import CentresList from "../components/Content/Centre/CentresList";
import CreateCentre from "../components/Content/Centre/CreateCentre";

const CentresPage = () => {
  const [provinces, setProvinces] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
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
  );
};

export default CentresPage;
