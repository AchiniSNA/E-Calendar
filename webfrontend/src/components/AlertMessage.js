import React from 'react';
import { Alert, AlertTitle } from '@mui/material';

function AlertMessage({ message, severity }) {
  return (
    <Alert severity={severity} variant="filled">
      <AlertTitle>{severity.toUpperCase()}</AlertTitle>
      {message}
    </Alert>
  );
}

export default AlertMessage;
