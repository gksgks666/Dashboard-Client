import Button from "@/components/Button/Button";

interface DefaultButtonProps {
  dialogOpenHandler: () => void;
  isDisabled: boolean | undefined;
}
const DefaultButton = ({
  dialogOpenHandler,
  isDisabled,
}: DefaultButtonProps) => {
  return (
    <Button
      onClick={dialogOpenHandler}
      variant="contained"
      sx={{
        opacity: isDisabled ? 0.5 : 1,
        pointerEvents: isDisabled ? "none" : "auto",
      }}
    >
      사용자 권한 변경
    </Button>
  );
};

export default DefaultButton;
