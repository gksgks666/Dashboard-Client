/*
 * modal, fab 전역 관리로 인해 미사용 (삭제예정)
 */

import Button from "@/components/Button/Button";

interface DefaultButtonProps {
  modalOpenHandler: () => void;
}

const DefaultButton = ({ modalOpenHandler }: DefaultButtonProps) => {
  return (
    <Button
      id="showErrorModalButton"
      onClick={modalOpenHandler}
      variant="contained"
    >
      로그 보기
    </Button>
  );
};

export default DefaultButton;
