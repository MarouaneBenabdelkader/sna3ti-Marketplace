import React from "react";
import Collapse from "@mui/material/Collapse";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";


function CustomCollapse({
    openAlert,
    setOpenAlert,
    alertMessage,
    alertSeverity,
    
}) {
  return (
    <Collapse in={openAlert} sx={{ marginTop: 1, alignSelf: "center", m: 1 }}>
      <Alert
        severity={alertSeverity}
        action={
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => {
              setOpenAlert(false);
            }}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        }
        sx={{ mb: 2 }}
      >
        {alertMessage}
      </Alert>
    </Collapse>
  );
}

export default CustomCollapse;
