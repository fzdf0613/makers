import ConfirmModal from "../ConfirmModal";
import Portal from "../ui/Portal";

type Props = {
  closeModal: () => void;
  handleConfirm: () => void;
  alertMessage: string | undefined;
};

export default function InquiryWriteModal({
  closeModal,
  handleConfirm,
  alertMessage,
}: Props) {
  return (
    <Portal>
      <ConfirmModal
        closeModal={closeModal}
        handleConfirm={handleConfirm}
        alertText={alertMessage}
        type={alertMessage ? "alert" : "cancel"}
      />
    </Portal>
  );
}
