'use client';

import EditIcon from '@mui/icons-material/Edit';
import SendIcon from '@mui/icons-material/Send';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
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
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImage(e.target.files[0]);
    }
  };

  const onChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !content || !image) {
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('text', content);
    formData.append('multipartFile', image);

    try {
      const response = await axios.post('/api/boards', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

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
                <div className="category">Gangnam-gu/Food</div>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  sx={{ '& > :not(style)': { m: 1, width: '25ch' } }}
                  noValidate
                  autoComplete="off"
                >
                  <TextField
                    id="standard-basic"
                    label="Please write the title of the post"
                    variant="standard"
                    style={{ width: 300 }}
                    value={title}
                    onChange={onChangeTitle}
                  />
                </Box>
                <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={onFileChange} />
              </div>
              <div className="textArea">
                <TextField
                  id="outlined-multiline-static"
                  label="Challenge"
                  placeholder="Feel free to write about the places you visited, your review of today's Challenge, and a description of the places you visited for the mission...!"
                  multiline
                  rows={16}
                  className="textfield"
                  value={content}
                  onChange={onChangeContent}
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
