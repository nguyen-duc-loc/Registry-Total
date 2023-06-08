import { useEffect } from "react";
import CreateInspection from "../components/Content/Inspection/CreateInspection";

const CreateInspectionPage = () => {
  useEffect(() => {
    document.title = "Tạo đăng kiểm";
  }, []);

  return <CreateInspection />;
};

export default CreateInspectionPage;
