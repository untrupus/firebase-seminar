import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {addCountry} from "../../store/actions";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import TextField from '@mui/material/TextField';
import {Button} from "@mui/material";

const AddCountryModal = ({open, close}) => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [flag, setFlag] = useState('');
  const [area, setArea] = useState('');
  const [population, setPopulation] = useState('');
  const [capital, setCapital] = useState('');

  const formSubmit = (e) => {
    e.preventDefault();
    if (name !== '' && flag !== '' && area !== '' && population !== '' && capital !== '') {
      dispatch(addCountry({name, flag, area, population, capital}));
      handleClose();
    }
  };

  const handleClose = () => {
    setPopulation('');
    setCapital('');
    setFlag('');
    setName('');
    setArea('');
    close();
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Add country
        </Typography>
        <form onSubmit={formSubmit}>
          <TextField
            label="Flag"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            variant="outlined"
            style={{marginBottom: '10px'}}
            fullWidth/>
          <TextField
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            variant="outlined"
            style={{marginBottom: '10px'}}
            fullWidth/>
          <TextField
            label="Area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            variant="outlined"
            style={{marginBottom: '10px'}}
            fullWidth/>
          <TextField
            label="Population"
            value={population}
            onChange={(e) => setPopulation(e.target.value)}
            variant="outlined"
            style={{marginBottom: '10px'}}
            fullWidth/>
          <TextField
            label="Capital"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            variant="outlined"
            style={{marginBottom: '10px'}}
            fullWidth/>
          <Button
            type='submit'
            disabled={name === '' || flag === '' || area === '' || population === '' || capital === ''}
            variant="contained"
            style={{marginBottom: '10px'}}
            fullWidth>Add</Button>
          <Button
            onClick={handleClose}
            variant="contained"
            style={{marginBottom: '10px'}}
            fullWidth>Cancel</Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddCountryModal;

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
