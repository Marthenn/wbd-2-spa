import { Alert, Snackbar, AlertTitle } from "@mui/material";

const Alerts = ({
  open,
  handleClose,
  title,
  description,
}: {
  open: boolean;
  handleClose: () => void;
  title: string;
  description?: string;
}) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose} anchorOrigin={{ vertical:'top',  horizontal:'left' }}>
    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
      <AlertTitle>{title}</AlertTitle>
      {description}
    </Alert>
    </Snackbar>
  );
};

export default Alerts;