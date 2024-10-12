import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Example from '../../DesignImage/ExampleDefaults';
import ImageModal from './templatesModal'
import { useState } from "react";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: '90%', sm: '80%', md: '70%', lg: '50%', xl: '50%' }, // Adjust width based on screen size
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({open, closeModal, handleUpload, uploadImageRef}) {
  const handleClose = () => {
    setShowExampleModal(false);
    closeModal()
  };
  const handleImage = (desc, modal) => {
    setShowExampleModal(false);
    handleUpload(desc);
  }
  const [showExampleModal, setShowExampleModal] = useState(false);
  const [imageData, setImageData] = useState({});
  const showDesignToolModal = (img) => {
    setImageData(img);
    setShowExampleModal(true);
  }

  const backBtn = () => {
    setShowExampleModal(false)
  }


  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit & Design You Image
            <Button onClick={handleClose} style={{position: "absolute", right : 0}}>X</Button>
            {showExampleModal  && <Button onClick={backBtn} >back</Button> }

          </Typography>
          
          {!showExampleModal &&  <ImageModal showDesignToolModal={showDesignToolModal}></ImageModal>}

          {showExampleModal &&  <Example handleUpload={handleImage} uploadImageRef={uploadImageRef} imageData={imageData}/>}
         
        </Box>
      </Modal>
    </div>
  );
}