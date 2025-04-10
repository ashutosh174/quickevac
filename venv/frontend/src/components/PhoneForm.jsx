import React from 'react';
import { Button, Paper, Box, Typography } from '@mui/material';

const PhoneForm = () => {
  const handleClick = () => {
    alert('Message Sent Successfully');
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 400, mx: 'auto', mt: 4 }}>
      <Box textAlign="center">
        <Typography variant="h5" gutterBottom>
          Quick Evac
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleClick}
        >
          Send Alerts
        </Button>
      </Box>
    </Paper>
  );
};

export default PhoneForm;
