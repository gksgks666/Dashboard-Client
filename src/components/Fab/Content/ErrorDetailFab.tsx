import { useFab, useModal } from "@/hooks";
import FlexBetween from "../../FlexBetween";
import { Box } from "@mui/material";
import { styled } from "@mui/system";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { ErrorLogList } from "@/types/API";

interface DataProps {
  data: ErrorLogList;
}

const ErrorDetailFab = (props: any) => {
  const { data }: DataProps = props;
  const { closeFab } = useFab();
  const { openModal } = useModal();
  const handleModalOpen = () => {
    closeFab({ type: "ErrorDetailFab" });
    openModal({ type: "ErrorDetailModal", props: { data } });
  };
  return (
    <FABwrap bgcolor="#007BFF">
      <FlexBetween height={"100%"} width={"100%"}>
        <Box
          onClick={handleModalOpen}
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
          onClick={() => closeFab({ type: "ErrorDetailFab" })}
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
    </FABwrap>
  );
};

export default ErrorDetailFab;

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
