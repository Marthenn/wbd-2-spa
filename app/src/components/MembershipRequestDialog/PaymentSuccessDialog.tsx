import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  useMediaQuery,
} from "@mui/material";
import pending from "../../assets/pending.svg";
import theme from "../../theme/theme";

const PaymentSuccessDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
      <DialogTitle>Payment Done!</DialogTitle>
      <DialogContent>
        <Box display="flex" alignItems="center" textAlign="center" style={{ marginBottom: 10 }}>
            <img src={pending} alt="pending" style={{ marginRight: 10 }} />
            <Typography variant="h5">Pending approval</Typography>
        </Box>
        <Typography>Wait for the administrator to approve your request.</Typography>
      </DialogContent>
      <DialogActions style={{ padding: 20 }}>
        <Button variant="contained" color="primary" onClick={handleClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PaymentSuccessDialog;
