import Button from "@/components/Button/Button";

interface DefaultButtonProps {
  dialogOpenHandler: () => void;
  roleNo: string;
}

const DefaultButton = ({ dialogOpenHandler, roleNo }: DefaultButtonProps) => {
  const isDisabled = roleNo !== "0" && roleNo !== "1";
  return (
    <Button
      onClick={dialogOpenHandler}
      variant="contained"
      sx={{
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      계정 상태 변경
    </Button>
  );
};

export default DefaultButton;
