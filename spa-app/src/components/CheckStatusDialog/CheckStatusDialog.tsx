import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  useMediaQuery,
} from '@mui/material';
import theme from '../../theme/theme';
import StatusDialog from './StatusDialog';

const CheckStatusDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [formData, setFormData] = useState({
    requestId: '', 
  });
  const [statusDialogOpen, setStatusDialogOpen] = useState(false);

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleCheck = () => {
    setStatusDialogOpen(true);
    handleClose();
  };

  const handleCloseStatusDialog = () => {
    setStatusDialogOpen(false);
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
      <DialogTitle>Check Your Request Status</DialogTitle>
      <DialogContent style={{ padding: 20}}>
        <TextField
          name="requestId"
          required
          fullWidth
          id="requestId"
          label="Request ID"
          autoFocus
          onChange={handleFormChange}
          value={formData.requestId} />
      </DialogContent>
      <DialogActions style={{ padding: 20 }}>
        <Button variant="contained" color="primary" onClick={handleCheck}>
          Check
        </Button>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
    <StatusDialog 
      open={statusDialogOpen}
      handleClose={handleCloseStatusDialog}
    />
    </>
  );
};

export default CheckStatusDialog;
