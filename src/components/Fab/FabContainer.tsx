import { createPortal } from "react-dom";
import { useTypedSelector } from "@/hooks";
import { fabSelector } from "@/rtk/features/fabSlice";
import ErrorDetailFab from "../Fab/Content/ErrorDetailFab";

interface ModalProps {
  [key: string]: any; // 전달될 props가 동적일 경우
}

const FAB_COMPONENTS: { [key: string]: React.FC<ModalProps> } = {
  ErrorDetailFab: ErrorDetailFab,
};

const FabContainer = () => {
  const Root = document.getElementById("modal-root");
  if (!Root) return null;

  const fabList = useTypedSelector(fabSelector);
  const renderFab = fabList.map(({ type, props }) => {
    const FabComponent = FAB_COMPONENTS[type];
    return <FabComponent key={type} {...props} />;
  });

  return createPortal(<>{renderFab}</>, Root);
};
export default FabContainer;
