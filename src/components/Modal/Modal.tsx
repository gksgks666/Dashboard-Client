import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useOutSideClick, useModal } from "@/hooks";
import { Box } from "@mui/material";

const Modal = ({ children, onOutsideClick = null }: any) => {
  const modalRef = useRef(null);
  const { closeModal } = useModal();
  const handleOutsideClick = () => {
    onOutsideClick ? onOutsideClick() : closeModal();
  };

  useOutSideClick(modalRef, handleOutsideClick); // modal 외부 클릭 시 이벤트

  //modal창이 떴을때 외부 스크롤막기, modal창 닫기 시 이전 스크롤 위치로 가짐
  useEffect(() => {
    document.body.style.cssText = `
    position: fixed;
    top: -${window.scrollY}px;
    overflow-y: scroll;
    width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <Overlay>
      <Box ref={modalRef}>
        <Contents>{children}</Contents>
      </Box>
    </Overlay>
  );
};

export default Modal;

const Overlay = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.2);
  z-index: 9999;
`;

const Contents = styled.div`
  margin: 50px 30px;
  h1 {
    font-size: 30px;
    font-weight: 600;
    margin-bottom: 60px;
  }
`;
