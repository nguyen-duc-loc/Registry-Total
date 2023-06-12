import { useEffect } from "react";
import CreateInspection from "../components/Content/Inspection/CreateInspection";
import { useAuthUser } from "react-auth-kit";
import Unauthorized from "../components/UI/Unauthorized";

const CreateInspectionPage = () => {
  const auth = useAuthUser();
  const admin = auth().data.role === "admin";

  useEffect(() => {
    document.title = "Tạo đăng kiểm";
  }, []);

  return admin ? <Unauthorized /> : <CreateInspection />;
};

export default CreateInspectionPage;
