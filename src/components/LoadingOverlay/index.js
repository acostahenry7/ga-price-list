import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { MutatingDots } from "react-loader-spinner";
import "./LoaderOverlay.css";

export default function LoadingOverlay(props) {
  return (
    <Modal
      {...props}
      size="lg"
      animation={false}
      backdrop={"static"}
      className="loading-modal"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Body
        style={{
          backgroundColor: "transparent",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <MutatingDots
          wrapperStyle={{ elevation: 2 }}
          color="#b25353"
          secondaryColor="#bd443b"
        />
      </Modal.Body>
    </Modal>
  );
}
