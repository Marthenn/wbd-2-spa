import{ useState } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
} from '@mui/material';
import theme from '../../theme/theme';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';

const StatusDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [status, setStatus] = useState<string>('Pending');

  const renderStatusIcon = () => {
    switch (status) {
      case 'Approved':
        return <CheckIcon color='success' sx={{mr: 2}} />;
      case 'Rejected':
        return <CancelIcon color= 'error' sx={{mr: 2}} />;
      case 'Pending':
        return <AccessTimeFilledIcon sx={{mr: 2}} />;
      default:
        return null;
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
      <DialogTitle>Request Status</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" textAlign="center" style={{ marginBottom: 10 }}>
          {renderStatusIcon()}
          <Typography>Your request with is {status}</Typography>
        </Box>
      </DialogContent>
      <DialogActions style={{ padding: 20 }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatusDialog;
