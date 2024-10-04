import { useState } from "react";
import { useCustomerAccountChange } from "@/hooks";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  SelectChangeEvent,
  MenuItem,
} from "@mui/material";
import Button from "@/components/Button/Button";
import { CustomerList } from "@/types/API";
import { Dispatcher } from "@/types/Common";

interface AccountChangeProps {
  userId: string;
  showDialog: boolean;
  dialogCloseHandler: () => void;
  setRowData: Dispatcher<CustomerList[]>;
  accountStatus: boolean;
}

const AccountChange = ({
  userId,
  showDialog,
  dialogCloseHandler,
  setRowData,
  accountStatus,
}: AccountChangeProps) => {
  const [account, setAccount] = useState<boolean>(accountStatus);
  const { mutate: AccountChange } = useCustomerAccountChange();
  const handleChange = (event: SelectChangeEvent) => {
    setAccount(event.target.value === "true");
  };
  const handleConfirm = () => {
    dialogCloseHandler();
    AccountChange({ userId, accountstatus: account });
    setRowData((prev) => {
      return prev.map((e) => {
        return e._id === userId ? { ...e, accountstatus: account } : e;
      });
    });
  };

  return (
    <Dialog open={showDialog} onClose={dialogCloseHandler}>
      <DialogTitle>계정 상태 선택</DialogTitle>
      <DialogContent sx={{ paddingTop: "10px !important" }}>
        <FormControl sx={{ m: 1, width: "200px", minWidth: 120 }}>
          <Select
            value={account.toString()}
            onChange={handleChange}
            displayEmpty
          >
            <MenuItem value="false">비활성화</MenuItem>;
            <MenuItem value="true">활성화</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} variant="contained">
          변경
        </Button>
        <Button onClick={dialogCloseHandler} variant="contained">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AccountChange;
