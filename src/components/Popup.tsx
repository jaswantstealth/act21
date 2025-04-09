import { useState, useEffect } from "react";
import Modal from "react-bootstrap/Modal";
import { BASE_URL } from "../../config";

const PopupModal = () => {
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState<any>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      const fetchPopupData = async () => {
        try {
          const res = await fetch(`${BASE_URL}/api/popup?populate=*`);
          const json = await res.json();
          const data = json.data?.attributes || null;

          if (data) {
            setPopupData(data);
            setShow(true);
          }
        } catch (err) {
          console.error("Error fetching popup data:", err);
        }
      };

      fetchPopupData();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setShow(false);

  const imageUrl = popupData?.popimage?.data?.attributes?.url;
  const registerLink = popupData?.registernowlink;

  return (
    <>
      <Modal show={show} onHide={handleClose} centered className="popup_modal">
        <Modal.Body className="p-0 rounded-3 bg-transparent position-relative">
          {/* Close Button */}
          <button
            type="button"
            className="btn-close position-absolute "
            aria-label="Close"
            onClick={handleClose}
          >
          </button>

          {imageUrl && registerLink && (
            <a href={registerLink} target="_blank" rel="noopener noreferrer">
              <img
                src={`${BASE_URL}${imageUrl}`}
                alt="Popup"
                style={{ width: "100%", borderRadius: "10px" }}
              />
            </a>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PopupModal;
