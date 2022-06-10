import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Paper } from '@mui/material';

function preventDefault(event) {
  event.preventDefault();
}

export default function CardMini() {
  return (
    <React.Fragment>
      <Paper><h4>Recent Deposits</h4>
      <Typography component="p" variant="h4">
        $3,024.00
      </Typography>
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        on 15 March, 2019
      </Typography>
     </Paper>
    </React.Fragment>
  );
}