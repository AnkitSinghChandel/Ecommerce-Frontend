import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";

const CancelPopup = () => {
  const [open, setOpen] = useState(false);

  <Button type="primary" onClick={() => setOpen(true)}>
    Open Modal of responsive width
  </Button>;

  return (
    <div>
      <Modal
        title="Modal responsive width"
        centered
        open={open}
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
      >
        <p>some contents...</p>
        <p>some contents...</p>
        <p>some contents...</p>
      </Modal>
    </div>
  );
};

export default CancelPopup;
