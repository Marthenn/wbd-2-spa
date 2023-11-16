import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  Paper,
  TextField,
  useMediaQuery,
} from "@mui/material";
import PaymentDialog from "./PaymentDialog";
import { useState } from "react";
import theme from "../../theme/theme";

const SignUpDialog = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    paymentProof: null,
  });

  const [formErrors, setFormErrors] = useState({
    username: "",
    email: "",
    paymentProof: null,
  });

  const handleFormChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    validateField(name, value);
  };

  const validateField = (name: string, value: string) => {
    const errors = { ...formErrors };

    if (name === "username") {
      if (!value) {
        errors.username = "Username is required";
      } else {
        errors.username = "";
      }
    }

    if (name === "email") {
      const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
      if (!emailPattern.test(value)) {
        errors.email = "Invalid email format";
      } else {
        errors.email = "";
      }
    }

    setFormErrors(errors);
  };

  const handleNextButtonClick = () => {
    const errors = { ...formErrors };

    if (!formData.username) {
      errors.username = "Username is required";
    }
    if (!formData.email) {
      errors.email = "Email is required";
    }

    setFormErrors(errors);

    if (
      !formData.username ||
      !formData.email ||
      Object.values(formErrors).some((error) => error !== "" && error !== null)
    ) {
      return;
    }

    setShowPaymentDialog(true);
    handleClose();
  };

  const handleCancelClick = () => {
    setFormData({
      username: "",
      email: "",
      paymentProof: null,
    });
    setFormErrors({
      username: "",
      email: "",
      paymentProof: null,
    });
    handleClose();
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
        <DialogTitle>Sign Up for 1 month</DialogTitle>
        <DialogContent>
          <Paper elevation={3} style={{ padding: 20 }}>
            <Box component="form" noValidate sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="username"
                    name="username"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    autoFocus
                    onChange={handleFormChange}
                    value={formData.username}
                    error={!!formErrors.username}
                    helperText={formErrors.username}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    id="email"
                    name="email"
                    label="Email Address"
                    autoComplete="email"
                    onChange={handleFormChange}
                    value={formData.email}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                  />
                </Grid>
              </Grid>
            </Box>
          </Paper>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="outlined" color="primary" onClick={handleCancelClick}>
              Cancel
            </Button>
          </div>
          <Button
            variant="contained"
            color="primary"
            onClick={handleNextButtonClick}
            disabled={
              !formData.username ||
              !formData.email ||
              Object.values(formErrors).some((error) => error !== "" && error !== null)
            }
          >
            Next
          </Button>
        </DialogActions>
      </Dialog>
      <PaymentDialog
        open={showPaymentDialog}
        handleClose={() => setShowPaymentDialog(false)}
        formData={formData}
      />
    </>
  );
};

export default SignUpDialog;
