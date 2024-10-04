import { useFab, useModal } from "@/hooks";
import { ErrorLogList } from "@/types/API";
import Button from "@/components/Button/Button";

interface ModalFabButtonProps {
  data: ErrorLogList;
}

const ModalFabButton = ({ data }: ModalFabButtonProps) => {
  const { openModal } = useModal();
  const { closeFab } = useFab();

  const handleClick = () => {
    closeFab({ type: "ErrorDetailFab" });
    openModal({
      type: "ErrorDetailModal",
      props: { data },
    });
  };

  return (
    <Button variant="contained" onClick={handleClick}>
      로그 보기
    </Button>
  );
};
export default ModalFabButton;
