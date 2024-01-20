import { useState, useEffect } from "react";
import "../styles/modal.css";

const Modal = () => {
  const [show, setShow] = useState(true);
  const [isSmall, setIsSmall] = useState(null || false);
  const [size, setSize] = useState(null || window.innerWidth);

  window.addEventListener("resize", () => {
    setSize(window.innerWidth);
  });

  useEffect(() => {
    if (size < 985) {
      setIsSmall(true);
    }
  }, []);

  return (
    <>
      {show === true && isSmall !== true && (
        <div className="modal">
          <h1>Minesweeper by NemoX12</h1>
          <button className="button" onClick={() => setShow(false)}>
            Start
          </button>
          <div className="modal-controls">
            <h2>Controls:</h2>
            <ul>
              <li>Left Click Mouse - Reveal Cell</li>
              <li>Right Click Mouse - Flag</li>
            </ul>
          </div>
        </div>
      )}

      {isSmall === true && (
        <div className="modal">
          <h1 className="err" style={{ color: "red" }}>
            Your device is unsupported.
          </h1>
        </div>
      )}
    </>
  );
};

export default Modal;
