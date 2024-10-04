/*
 * FAB 전역 관리로 인해 미사용 (삭제예정)
 * 대신하여 components/Fab/ErrorDetailFab 사용
 */

import { createPortal } from "react-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Box } from "@mui/material";
import FlexBetween from "@/components/FlexBetween";
import { styled } from "@mui/system";
import { Dispatcher } from "@/types/Common";

interface FABbuttonProps {
  modalOpenHandler: () => void;
  setShowFAB: Dispatcher<boolean>;
}
interface FABwrapProps {
  bgcolor?: string;
}

const FABwrap = styled(Box)<FABwrapProps>(({ bgcolor }) => ({
  position: "fixed",
  bottom: 0,
  right: 0,
  borderRadius: "10px 0 0 0",
  width: "200px",
  height: "50px",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: bgcolor,
  padding: "0 10px",
}));

const FABbutton = ({ modalOpenHandler, setShowFAB }: FABbuttonProps) => {
  return createPortal(
    <FABwrap bgcolor="#007BFF">
      <FlexBetween height={"100%"} width={"100%"}>
        <Box
          onClick={modalOpenHandler}
          sx={{
            display: "flex",
            alignItems: "center",
            fontSize: "16px",
            flexGrow: 1,
            cursor: "pointer",
            color: "white",
          }}
        >
          Error Details
        </Box>
        <Box
          onClick={() => setShowFAB(false)}
          sx={{
            display: "flex",
            alignItems: "center",
            flexGrow: 0,
            cursor: "pointer",
          }}
        >
          <CloseOutlinedIcon sx={{ color: "white" }} />
        </Box>
      </FlexBetween>
    </FABwrap>,
    document.body,
  );
};

export default FABbutton;
