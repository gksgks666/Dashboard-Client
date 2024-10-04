import { Box } from "@mui/material";
import Button from "@/components/Button/Button";
import dayjs from "dayjs";
import { DatePickerDefaultButtonProps } from "@/types/Module/DatePicker";

const DefaultButton = ({
  dialogOpenHandler,
  startDate,
  endDate,
}: DatePickerDefaultButtonProps) => {
  const startFormatDate = dayjs(startDate).format("YYYY-MM-DD");
  const endFormatDate = dayjs(endDate).format("YYYY-MM-DD");
  return (
    <Box
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "0 10px 0 10px",
      }}
    >
      <Button onClick={dialogOpenHandler} variant="contained">
        {startDate && endDate
          ? `${startFormatDate} ~ ${endFormatDate}`
          : "날짜 지정하기"}
      </Button>
    </Box>
  );
};

export default DefaultButton;
