import { useState } from "react";
import DefaultButton from "./DefaultButton";
import SpecifyDateDialog from "./SpecifiDateDialog";
import { DatePickerProps } from "@/types/Module/DatePicker";

const DatePicker = ({
  startDate,
  endDate,
  setStartDate,
  setEndDate,
}: DatePickerProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const dialogOpenHandler = () => {
    setShowDialog(true); //dialog 열기
  };
  const dialogCloseHandler = () => {
    setShowDialog(false); //dialog 닫기
  };

  return (
    <>
      <DefaultButton //기본 버튼 클릭 시 날짜지정 modal 제공
        dialogOpenHandler={dialogOpenHandler}
        startDate={startDate}
        endDate={endDate}
      />
      <SpecifyDateDialog // 날짜선택 modal 제공
        showDialog={showDialog}
        dialogCloseHandler={dialogCloseHandler}
        setStartDate={setStartDate}
        setEndDate={setEndDate}
        startDate={startDate}
        endDate={endDate}
      />
    </>
  );
};

export default DatePicker;
