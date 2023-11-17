import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
} from "@mui/material";
import UploadProofDialog from "./PaymentSuccessDialog";
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import theme from "../../theme/theme";
import axios from "axios";
import { REST_BASE_URL } from "../../constants/constants";
import { getToken } from "../../utils/token";

const PaymentDialog = ({
  open,
  handleClose,
  formData,
}: {
  open: boolean;
  handleClose: () => void;
  formData: {
    username: string;
    email: string;
    paymentProof: File | null;
  };
}) => {
  const [activeStep, setActiveStep] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState<number>(0);
  const [showPaymentSuccessDialog, setShowPaymentSuccessDialog] = useState(false);
  const [uploadButtonDisabled, setUploadButtonDisabled] = useState(true);
  const [doneButtonDisabled, setDoneButtonDisabled] = useState(true);

  const handleDoneButtonClick = async() => {
    if (formData.paymentProof) {
      try {
        const response = await axios({
          method: 'post',
          url: `${REST_BASE_URL}api/membership/create/request`,
          data: {formData
          },
          headers: {
              "Authorization": getToken()
          }
        });
        
        if(response.data.message === 'success') {
          setShowPaymentSuccessDialog(true);
          handleClose();
        }
      } catch (error) {
        console.error('Error editing chapter:', error);
      }
    } else {
      setDoneButtonDisabled(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target;
    if (files && files.length > 0) {
      formData.paymentProof = files[0];
      setUploadButtonDisabled(false);
      setDoneButtonDisabled(false);
    }
  };

  const paymentMethods = [
    {
      label: "BCA Transfer",
      instructions: [
        "Open your BCA mobile banking app.",
        "Log in with your username and password.",
        "Select 'Transfer' from the main menu.",
        "Choose 'Bank BCA' as the recipient bank.",
        "Enter the recipient account number: 1234567890.",
        "Enter the transfer amount: 15$.",
        "Review the transaction details and confirm.",
        "Upload payment proof.",
      ],
    },
    {
      label: "Mandiri Transfer",
      instructions: [
        "Open your Mandiri mobile banking app.",
        "Log in with your username and password.",
        "Select 'Transfer' from the main menu.",
        "Choose 'Bank Mandiri' as the recipient bank.",
        "Enter the recipient account number: 1234567890.",
        "Enter the transfer amount: 15$.",
        "Review the transaction details and confirm.",
        "Upload payment proof.",
      ],
    },
    {
      label: "BRI Transfer",
      instructions: [
        "Open your BRI mobile banking app.",
        "Log in with your username and password.",
        "Select 'Transfer' from the main menu.",
        "Choose 'Bank BRI' as the recipient bank.",
        "Enter the recipient account number: 1234567890.",
        "Enter the transfer amount: 15$.",
        "Review the transaction details and confirm.",
        "Upload payment proof.",
      ],
    },
  ];

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
    if (activeStep === paymentMethods[paymentMethod].instructions.length - 2) {
      setUploadButtonDisabled(false);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleChangePaymentMethod = (event: any) => {
    setPaymentMethod(event.target.value);
    setActiveStep(0);
    setUploadButtonDisabled(true);
    formData.paymentProof = null;
    setDoneButtonDisabled(true);
  };
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <>
      <Dialog open={open} onClose={handleClose} fullScreen={isSmallScreen}>
        <DialogTitle>Payment</DialogTitle>
        <DialogContent>
          <Paper elevation={3} style={{ padding: 20 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Payment Method:</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={paymentMethod}
                label="Payment Method"
                onChange={handleChangePaymentMethod}
              >
                {paymentMethods.map((method, index) => (
                  <MenuItem key={index} value={index}>
                    {method.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Stepper activeStep={activeStep} orientation="vertical">
              {paymentMethods[paymentMethod].instructions.map((instruction: string, index: number) => (
                <Step key={index}>
                  <StepLabel>{instruction}</StepLabel>
                  {index === paymentMethods[paymentMethod].instructions.length - 1 && (
                    <label>
                      <Button
                        sx={{ ml: 4 }}
                        component="label"
                        variant="contained"
                        startIcon={<CloudUploadIcon/>}
                        disabled={uploadButtonDisabled}
                      >
                        Upload PNG/JPG
                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          name="paymentProof"
                        />
                      </Button>
                      {formData.paymentProof && (
                        <Typography variant="body2" color="textPrimary">
                          {formData.paymentProof.name} selected
                        </Typography>
                      )}
                    </label>
                  )}
                </Step>
              ))}
            </Stepper>
          </Paper>
        </DialogContent>
        <DialogActions style={{ padding: 20 }}>
          <div style={{ flexGrow: 1 }}>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </div>
          {activeStep > 0 && (
            <Button onClick={handleBack}>Back</Button>
          )}
          {activeStep < paymentMethods[paymentMethod].instructions.length - 1 && (
            <Button variant="contained" color="primary" onClick={handleNext}>
              Next
            </Button>
          )}
          {activeStep === paymentMethods[paymentMethod].instructions.length - 1 && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleDoneButtonClick}
              disabled={doneButtonDisabled}
            >
              Done
            </Button>
          )}
        </DialogActions>
      </Dialog>
      <UploadProofDialog
        open={showPaymentSuccessDialog}
        handleClose={() => setShowPaymentSuccessDialog(false)}
      />
    </>
  );
};

export default PaymentDialog;
