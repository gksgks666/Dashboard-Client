import { Dispatch, SetStateAction, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import Button from "@/components/Button/Button";
import { usePermissionLevelChange } from "@/hooks";
import { SelectChangeEvent } from "@mui/material/Select";
import { UserList } from "@/types/API";

interface RoleChangeProps {
  roleNo: string;
  userId: string;
  showDialog: boolean;
  dialogCloseHandler: () => void;
  setRowData: Dispatch<SetStateAction<UserList[]>>;
}

const RoleChange = ({
  roleNo,
  userId,
  showDialog,
  dialogCloseHandler,
  setRowData,
}: RoleChangeProps) => {
  const [role, setRole] = useState<string>(roleNo);
  const { mutate: LevelChange } = usePermissionLevelChange();
  const handleChange = (event: SelectChangeEvent) => {
    setRole(event.target.value);
  };
  const handleConfirm = () => {
    dialogCloseHandler();
    LevelChange({ userId, role });
    setRowData((prev) => {
      return prev.map((e) => {
        return e._id === userId ? { ...e, role } : e;
      });
    });
  };
  const handleClose = () => {
    dialogCloseHandler();
    setRole(roleNo);
  };

  return (
    <Dialog open={showDialog} onClose={dialogCloseHandler}>
      <DialogTitle>권한 선택</DialogTitle>
      <DialogContent sx={{ paddingTop: "10px !important" }}>
        <FormControl sx={{ m: 1, width: "200px", minWidth: 120 }}>
          <Select value={role} onChange={handleChange} displayEmpty>
            <MenuItem value={"1"}>Admin</MenuItem>
            <MenuItem value={"2"}>User</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirm} variant="contained">
          변경
        </Button>
        <Button onClick={handleClose} variant="contained">
          취소
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default RoleChange;
