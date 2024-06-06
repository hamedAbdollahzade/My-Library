import { createPortal } from "react-dom";

const PortalTest = () => {
  return createPortal(
    <div>PortalTest</div>,
    document.getElementById("portal-test")
  );
};

export default PortalTest;
