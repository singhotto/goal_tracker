import React, { useState } from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Divider,
  FormGroup,
} from '@mui/material';
import MultipleDays from './MultipleDays';

const MainForm = ({ onSubmit }) => {
  const [state, setState] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    start_date: '',
    end_date: '',
    work_days: [],
    duration_in_hours: '',
    urgent: false,
    important: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };
  
  const handleDaysChange = (selectedDay) => {
    let everyday = false;
    let days = [];
    for(let day of selectedDay){
        if(day.day == 'everyday'){
            everyday = true;
            days = ['everyday'];
        }else{
            days.push(day.day);
        }
    }
    setFormData((prev) => ({
      ...prev,
      work_days: days
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setState(!state);
    setFormData({
      name: '',
      start_date: '',
      end_date: '',
      work_days: [],
      duration_in_hours: '',
      urgent: false,
      important: false,
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="Start Date"
        name="start_date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.start_date}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <TextField
        fullWidth
        label="End Date"
        name="end_date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.end_date}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <MultipleDays reset={state} onChange={handleDaysChange} />
      </FormControl>
      <TextField
        fullWidth
        label="Duration in Hours"
        name="duration_in_hours"
        type="number"
        step="0.1"
        value={formData.duration_in_hours}
        onChange={handleChange}
        sx={{ mb: 2 }}
      />
      <FormGroup row>
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.urgent}
            onChange={handleChange}
            name="urgent"
          />
        }
        label="Urgent"
      />
      <FormControlLabel
        control={
          <Checkbox
            checked={formData.important}
            onChange={handleChange}
            name="important"
          />
        }
        label="Important"
      />
      </FormGroup>

      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default MainForm;
