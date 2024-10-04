import { Dispatcher } from "@/types/Common";

export interface DatePickerProps {
  startDate: string;
  endDate: string;
  setStartDate: Dispatcher<string>;
  setEndDate: Dispatcher<string>;
}

export type DatePickerDefaultButtonProps = Pick<
  DatePickerProps,
  "startDate" | "endDate"
> & {
  dialogOpenHandler: () => void;
};

export type DatePickerSpecifiDateDialog = DatePickerProps & {
  showDialog: boolean;
  dialogCloseHandler: () => void;
};
