import { useAuthUser } from "react-auth-kit";
import InspectionsTable from "../components/Content/Inspection/InspectionsTable";
import Unauthorized from "../components/UI/Unauthorized";

const InspectionsPage = (props) => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  return admin ? <Unauthorized /> : <InspectionsTable mode={props.mode} />;
};

export default InspectionsPage;
