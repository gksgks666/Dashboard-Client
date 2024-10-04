import { Dispatch, SetStateAction, useState } from "react";
import DefaultButton from "./DefaultButton";
import RoleChange from "./RoleChange";
import { UserList } from "@/types/API";

interface ButtonAndSelectProps {
  data: UserList;
  setRowData: Dispatch<SetStateAction<UserList[]>>;
}

const ButtonAndSelect = ({ data, setRowData }: ButtonAndSelectProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const dialogOpenHandler = () => {
    setShowDialog(true); //dialog 열기
  };
  const dialogCloseHandler = () => {
    setShowDialog(false); //dialog 닫기
  };

  return (
    <>
      <DefaultButton
        dialogOpenHandler={dialogOpenHandler}
        isDisabled={data.isDisabled}
      />
      <RoleChange
        roleNo={data.role}
        userId={data._id}
        showDialog={showDialog}
        dialogCloseHandler={dialogCloseHandler}
        setRowData={setRowData}
      />
    </>
  );
};

export default ButtonAndSelect;
