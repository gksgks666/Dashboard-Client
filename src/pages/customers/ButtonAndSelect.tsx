import { useState } from "react";
import DefaultButton from "./DefaultButton";
import AccountChange from "./AccountChange";
import { CustomerList } from "@/types/API";
import { Dispatcher } from "@/types/Common";

interface ButtonAndSelectProps {
  data: CustomerList;
  setRowData: Dispatcher<CustomerList[]>;
  roleNo: string;
}

const ButtonAndSelect = ({
  data,
  setRowData,
  roleNo,
}: ButtonAndSelectProps) => {
  const [showDialog, setShowDialog] = useState<boolean>(false);

  const dialogOpenHandler = () => {
    setShowDialog(true); //dialog 열기
  };
  const dialogCloseHandler = () => {
    setShowDialog(false); //dialog 닫기
  };

  return (
    <>
      <DefaultButton dialogOpenHandler={dialogOpenHandler} roleNo={roleNo} />
      <AccountChange
        userId={data._id}
        showDialog={showDialog}
        dialogCloseHandler={dialogCloseHandler}
        setRowData={setRowData}
        accountStatus={data.accountstatus}
      />
    </>
  );
};

export default ButtonAndSelect;
