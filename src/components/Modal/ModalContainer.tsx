import { createPortal } from "react-dom";
import { useTypedSelector } from "@/hooks";
import { modalSelector } from "@/rtk/features/modalSlice";
import ErrorDetailModal from "./Content/ErrorDetailModal";

interface ModalProps {
  [key: string]: any; // 전달될 props가 동적일 경우
}

const MODAL_COMPONENTS: { [key: string]: React.FC<ModalProps> } = {
  ErrorDetailModal: ErrorDetailModal,
};

const ModalContainer = () => {
  const modalList = useTypedSelector(modalSelector);

  const modalRoot = document.getElementById("modal-root");
  if (!modalRoot) return null;

  const renderModals = modalList.map(({ type, props }) => {
    const ModalComponent = MODAL_COMPONENTS[type];
    return <ModalComponent key={type} {...props} />;
  });

  return createPortal(<>{renderModals}</>, modalRoot);
};
export default ModalContainer;
