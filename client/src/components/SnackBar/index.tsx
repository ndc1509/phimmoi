import { Alert, Snackbar } from "@mui/material";
import React from "react";
// type CustomSnackBarProps = {
//   active: boolean;
//   success: boolean;
//   msg: string;
// };
const withSnackbar = (WrappedComponent) => {
  return (props) => {
    const [open, setOpen] = React.useState(false);
    const [message, setMessage] = React.useState("I'm a custom snackbar");
    const [severity, setSeverity] = React.useState<"success" | "error">(
      "success"
    );
    const showMessage = (message, severity: "success" | "error") => {
      setMessage(message);
      setSeverity(severity);
      setOpen(true);
    };

    const handleClose = (
      event?: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === "clickaway") {
        return;
      }
      setOpen(false);
    };
    return (
      <>
        <WrappedComponent {...props} snackbarShow={showMessage} />
        <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={severity}>
            {message}
          </Alert>
        </Snackbar>
      </>
    );
  };
};

export default withSnackbar;
