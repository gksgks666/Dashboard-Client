import styled from "styled-components";
import Modal from "@/components/Modal/Modal";
import { useFab, useModal, useTypedSelector } from "@/hooks";
import FlexBetween from "@/components/FlexBetween";
import { Box } from "@mui/material";
import ExpandMoreOutlinedIcon from "@mui/icons-material/ExpandMoreOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ErrorLogList } from "@/types/API";
import { fabSelector } from "@/rtk/features/fabSlice";

interface DataProps {
  data: ErrorLogList;
}
const ErrorDetailModal = (props: any) => {
  const { closeModal } = useModal();
  const { openFab, closeFab } = useFab();
  const { data }: DataProps = props;
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
  const handleMinimize = () => {
    closeModal();
    if (
      useTypedSelector(fabSelector).find(
        (item) => item.type === "ErrorDetailFab",
      )
    ) {
      closeFab({ type: "ErrorDetailFab" });
    }
    openFab({ type: "ErrorDetailFab", props: { data } });
  };
  return (
    <Modal onOutsideClick={handleMinimize}>
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
              <ExpandMoreOutlinedIcon onClick={handleMinimize} />
              <CloseOutlinedIcon onClick={closeModal} />
            </Box>
          </FlexBetween>
        </Box>
        <Box sx={{ padding: "20px", height: "674px" }}>{contentSetting}</Box>
      </Box>
    </Modal>
  );
};

export default ErrorDetailModal;

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
