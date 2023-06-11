import { Button } from "antd";
import { IoAddCircleOutline } from "react-icons/io5";
import TextWithIcon from "../../UI/TextWithIcon";

import CentreModal from "./CentreModal";
import { useState } from "react";

const CreateCentre = (props) => {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div style={{ marginBottom: "2rem" }}>
      <CentreModal
        provinces={props.provinces}
        setOpen={setOpenModal}
        open={openModal}
        mode="add"
      />
      <Button
        shape="round"
        size="large"
        type="dashed"
        onClick={() => setOpenModal(true)}
        disabled={props.loading}
      >
        <TextWithIcon Icon={IoAddCircleOutline} text="Thêm trung tâm" />
      </Button>
    </div>
  );
};

export default CreateCentre;
