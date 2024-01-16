import { useState } from "react";

const useFormModal = () => {
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleOpen = () => setShow(true);
  const handleClose = () => setShow(false);

  return { show, loading, setShow, handleOpen, handleClose, setLoading };
};

export default useFormModal;
