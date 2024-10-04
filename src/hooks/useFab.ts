import { useTypedDispatch } from "@/hooks";
import { openFab, closeFab } from "@/rtk/features/fabSlice";
import { ModalState } from "@/types/Module/Modal";

export const useFab = () => {
  const dispatch = useTypedDispatch();

  const handleOpenFab = ({ type, props }: ModalState) => {
    dispatch(openFab({ type, props }));
  };

  const handleCloseFab = ({ type }: ModalState) => {
    dispatch(closeFab({ type }));
  };

  return { openFab: handleOpenFab, closeFab: handleCloseFab };
};
