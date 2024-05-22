import * as React from 'react';
import { FormControl, TextField, InputAdornment } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export default function ReserveDateSelect({ value, onChange }) {
  return (
    <FormControl sx={{ m: 1, width: "610px", background: "white" }} xs={6}>
      <TextField
        variant="outlined"
        name="rsvDate"
        type="date"
        value={value}
        onChange={onChange}
        label="날짜"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <AccessTimeIcon />
            </InputAdornment>
          ),
        }}
      />
    </FormControl>
  );
}
