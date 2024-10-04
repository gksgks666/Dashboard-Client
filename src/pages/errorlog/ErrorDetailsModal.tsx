/*
 * modal 전역 관리로 인해 미사용  (삭제예정)
 * 대신하여 components/Modal/ErrorDetailModal 사용
 */

import FlexBetween from "@/components/FlexBetween";
import { Box, Modal } from "@mui/material";
import styled from "styled-components";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ErrorLogList } from "@/types/API";

interface StyledSpanProps {
  type: "string" | "number" | "key" | "null";
}

const StyledSpan = styled.span<StyledSpanProps>`
  color: ${(props) =>
    props.type === "string"
      ? "#CE916A"
      : props.type === "number"
        ? "#B5CEA8"
        : props.type === "key"
          ? "#9CDCFE"
          : "#4FB8FE"};
`;
const style = {
  position: "fixed",
  bottom: "0",
  right: "0",
  height: "700px",
  width: "600px",
  bgcolor: "#1E1E1E",
  color: "white",
  boxShadow: 24,
  overflowY: "auto",
};

interface ErrorDetailsModalProps {
  data: ErrorLogList;
  modalCloseHandler: () => void;
  showModal: boolean;
  minimizehandler: () => void;
}

const ErrorDetailsModal = ({
  data,
  modalCloseHandler,
  showModal,
  minimizehandler,
}: ErrorDetailsModalProps) => {
  const contentSetting = Object.entries(data).map(([key, value]) => {
    const type = typeof value as "string" | "number" | "null";
    return (
      <Box key={key}>
        <StyledSpan type={"key"}>{key}</StyledSpan> :{" "}
        <StyledSpan type={type}>
          {type === "string" ? `"${value}" ` : value}
        </StyledSpan>
      </Box>
    );
  });

  return (
    <Modal
      open={showModal}
      onClose={minimizehandler}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            backgroundColor: "#007BFF",
            height: "25px",
          }}
        >
          <FlexBetween>
            <Box sx={{ padding: "2px 0 5px 7px" }}>errorLog</Box>
            <Box sx={{ display: "flex", gap: "5px", paddingRight: "2px" }}>
              <ExpandMoreOutlinedIcon onClick={minimizehandler} />
              <CloseOutlinedIcon onClick={modalCloseHandler} />
            </Box>
          </FlexBetween>
        </Box>
        <Box
          id="modal-modal-description"
          sx={{ padding: "20px", height: "674px" }}
        >
          {contentSetting}
        </Box>
      </Box>
    </Modal>
  );
};

export default ErrorDetailsModal;
