import React, { useState, useEffect } from "react";

const Modal = ({ styles, title, message }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [open]);

  return (
    open && (
      <div
        open={open}
        className={styles.successBoxWrapper}
        onClick={() => {
          setOpen(false);
        }}
      >
        <div className={styles.successBox}>
          <button
            onClick={() => {
              setOpen(false);
            }}
          >
            close
          </button>
          <h4>{title}</h4>
          <p>{message}</p>
        </div>
      </div>
    )
  );
};

export default Modal;
