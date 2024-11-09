'use client';

import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './setModal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  height: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SetModal() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span className="container">
      <Button onClick={handleOpen}>Write Review</Button>
      <Fab color="primary" aria-label="edit" style={{ width: 40, height: 40 }} onClick={handleOpen}>
        <EditIcon />
      </Fab>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <div className="title">Write Challenge Certification</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-container">
              <div>
                <div className="category">강남구/음식</div>
                <div className="note">글의 제목을 작성해주세요</div>
                <form>
                  <input type="file" accept="image/png, image/jpeg, image/jpg" />
                </form>
              </div>
              <TextField id="outlined-multiline-static" label="Challenge" multiline rows={18} className="textfield" />
            </div>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}
