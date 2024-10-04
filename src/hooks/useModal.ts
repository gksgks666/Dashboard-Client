import { useTypedDispatch } from "@/hooks";
import { openModal, closeModal } from "@/rtk/features/modalSlice";
import { ModalState } from "@/types/Module/Modal";

export const useModal = () => {
  const dispatch = useTypedDispatch();

  const handleOpenModal = ({ type, props }: ModalState) => {
    dispatch(openModal({ type, props }));
  };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  return { openModal: handleOpenModal, closeModal: handleCloseModal };
};
