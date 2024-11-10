'use client';

import AddIcon from '@mui/icons-material/Add';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import './modal.css';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 660,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function SetGatheringModal() {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <span className="container">
      <div>
        <span style={{ fontSize: 22, fontWeight: 600, marginRight: 10 }}>Recruiting Members</span>
        <Fab color="primary" aria-label="edit" style={{ width: 40, height: 40 }} onClick={handleOpen}>
          <AddIcon />
        </Fab>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <Typography id="modal-modal-title" variant="h4" component="h2">
            <div className="title">Write a recruiting post for challenge</div>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <div className="modal-container">
              <div className="category" style={{ fontSize: 20, fontWeight: 400 }}>
                Gangnam-gu/Food
              </div>
              <div className="textArea">
                <TextField
                  id="outlined-multiline-static"
                  label="Challenge"
                  placeholder="* * Recruit * *"
                  multiline
                  rows={8}
                  className="textfield"
                />
                <Button variant="contained" endIcon={<SendIcon />} type="submit">
                  Send
                </Button>
              </div>
            </div>
          </Typography>
        </Box>
      </Modal>
    </span>
  );
}
