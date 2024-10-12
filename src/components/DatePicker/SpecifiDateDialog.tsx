import { useState } from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import Button from "@/components/Button/Button";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import { DatePickerSpecifiDateDialog } from "@/types/Module/DatePicker";
import { isEmpty } from "@/utils/customFn";

const SpecifiDateDialog = ({
  showDialog,
  dialogCloseHandler,
  setStartDate,
  setEndDate,
  startDate,
  endDate,
}: DatePickerSpecifiDateDialog) => {
  const [datePickerStartDate, setDatePickerStartDate] = useState<Dayjs | null>(
    isEmpty(startDate) ? dayjs() : dayjs(startDate),
  );
  const [datePickerEndDate, setDatePickerEndDate] = useState<Dayjs | null>(
    isEmpty(endDate) ? dayjs() : dayjs(endDate),
  );

  const handleConfirm = () => {
    setStartDate(dayjs(datePickerStartDate).format("YYYY-MM-DD 00:00:00"));
    setEndDate(dayjs(datePickerEndDate).format("YYYY-MM-DD 23:59:59"));
    dialogCloseHandler();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog
        open={showDialog}
        onClose={dialogCloseHandler}
        disableRestoreFocus
      >
        <DialogTitle>날짜 선택</DialogTitle>
        <DialogContent sx={{ paddingTop: "10px !important" }}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <DatePicker
              label="시작 날짜 선택하기"
              format="YYYY-MM-DD"
              value={datePickerStartDate}
              onChange={(newValue: Dayjs | null) =>
                setDatePickerStartDate(newValue)
              }
              disableFuture
              showDaysOutsideCurrentMonth
              shouldDisableDate={(day) => {
                return dayjs(day).isBefore(
                  dayjs().subtract(3, "M").subtract(1, "d"),
                );
              }}
            />
            <DatePicker
              label="종료 날짜 선택하기"
              value={datePickerEndDate}
              format="YYYY-MM-DD"
              onChange={(newValue: Dayjs | null) =>
                setDatePickerEndDate(newValue)
              }
              disableFuture
              showDaysOutsideCurrentMonth
              shouldDisableDate={(day) => {
                return dayjs(day).isBefore(
                  dayjs().subtract(3, "M").subtract(1, "d"),
                );
              }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirm} variant="contained">
            적용
          </Button>
          <Button onClick={dialogCloseHandler} variant="contained">
            취소
          </Button>
        </DialogActions>
      </Dialog>
    </LocalizationProvider>
  );
};

export default SpecifiDateDialog;
