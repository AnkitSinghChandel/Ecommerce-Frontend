import React, { useState } from "react";
import { Button, Flex, Modal } from "antd";
// import Draggable from "react-draggable";

const CancelPopup = (props) => {
  return (
    <div>
      <Modal
        {...props}
        title={props.title}
        centered
        open={props.open}
        onOk={() => props.onOk()}
        onCancel={() => props.onCancel()}
        maskClosable={false}
        loading={false}
        width={{
          xs: "90%",
          sm: "80%",
          md: "70%",
          lg: "60%",
          xl: "50%",
          xxl: "40%",
        }}
        footer={[
          <div className="flex justify-center gap-5">
            <Button
              key="back"
              onClick={props.onCancel}
              className="cancelButton ascButton"
            >
              No
            </Button>

            <Button
              key="submit"
              loading={props.loading}
              className="addButton ascButton"
              onClick={() => {
                props.onOk();
              }}
            >
              Yes
            </Button>

            {/* <Button
              key="link"
              href="https://google.com"
              target="_blank"
              className="hidden"
              loading={props.loading}
              onClick={props.onCancel}
            >
              Search on Google
            </Button> */}
          </div>,
        ]}
      >
        <div className="py-4 text-center">
          <p className="text-[16px] font-medium text-[#dc3545]">
            This data will be removed from the system <br /> and can not be
            undone.
          </p>
          <p className="py-1 text-[16px] font-medium text-[#4b5966]">
            Do you want to proceed?
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default CancelPopup;
