import { useNavigate } from "react-router-dom";
import { Modal } from "../ui/Modal";

export default function AIDemoModal() {
  const navigate = useNavigate();
  const handleClose = () => navigate(-1);

  return (
    <Modal open onClose={handleClose}>
      <div className="relative w-full">
        <button
          className="absolute -top-2 -right-2 text-white bg-dark2 rounded-full px-2"
          onClick={handleClose}
        >
          ✕
        </button>
        <video className="w-full" src="/demo.mp4" controls autoPlay />
      </div>
    </Modal>
  );
}
