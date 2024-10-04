/*
 * modal, fab 전역 관리로 인해 미사용 (삭제예정)
 */

import { useState, useEffect } from "react";
import DefaultButton from "./DefaultButton";
import ErrorDetailsModal from "./ErrorDetailsModal";
import FABbutton from "./FABbutton";
import { ErrorLogList } from "@/types/API";

interface ButtonAndModalProps {
  data: ErrorLogList;
}

const ButtonAndModal = ({ data }: ButtonAndModalProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showFAB, setShowFAB] = useState<boolean>(false);

  const modalOpenHandler = () => {
    setShowModal(true);
    if (showFAB) {
      setShowFAB(false);
    }
  };
  const modalCloseHandler = () => {
    setShowModal(false);
    if (showFAB) setShowFAB(false);
  };

  const minimizehandler = () => {
    setShowModal(false);
    setShowFAB(true);
  };
  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (target.id === "showErrorModalButton") {
        setShowFAB(false);
      }
    };
    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, []);

  return (
    <>
      <DefaultButton modalOpenHandler={modalOpenHandler} />
      <ErrorDetailsModal // 에러내용 상세보기 로그 UI
        data={data}
        modalCloseHandler={modalCloseHandler}
        minimizehandler={minimizehandler}
        showModal={showModal}
      />
      {showFAB && (
        <FABbutton //우하단에 표시되는 작은 FAB 버튼 UI
          modalOpenHandler={modalOpenHandler}
          setShowFAB={setShowFAB}
        />
      )}
    </>
  );
};

export default ButtonAndModal;
