import React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const BackdropComponent = ({term}) => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={term}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default BackdropComponent;
