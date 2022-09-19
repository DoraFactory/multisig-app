import * as React from 'react';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


export default function PositionedSnackbar(type) {
  const [open, setOpen] = React.useState(false);

  const handleAlertClick = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const chooseAlertType = (type) => {
    if (type !== 'success' || type !== 'error') {
        type = "error"
    }
    return type
  }

  const buttons = (
    <React.Fragment>
      <Button
        onClick={handleAlertClick}
      >
        Top-Center
      </Button>
    </React.Fragment>
  );

  return (
    <div>
        {buttons}
      <Snackbar
        anchorOrigin={{ 
            vertical: 'top',
            horizontal: 'center', 
        }}
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        key={'top' + 'center'}
      >
      
        <Alert onClose={handleClose} severity={chooseAlertType(type)} sx={{ width: '100%' }}>
        This is a success message!
        </Alert>
    

      </Snackbar>
      </div>
  );
}
