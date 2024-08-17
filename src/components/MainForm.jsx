import React, { useState } from 'react';
import {
  TextField,
  FormControl,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  FormGroup,
} from '@mui/material';
import MultipleDays from './MultipleDays';
import axios from 'axios';

const MainForm = () => {
  const [state, setState] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    title: '',
    start_date: '',
    end_date: '',
    work_days: [],
    duration_in_hours: '',
    urgent: false,
    important: false,
  });

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.start_date){
      newErrors.start_date = 'Start Date is required';
    }else if(formData.start_date < today){
      newErrors.start_date = 'Start Date cannot be earlier than Today';
    }
    if (!formData.end_date) {
      newErrors.end_date = 'End Date is required';
    } else if (formData.end_date < formData.start_date) {
      newErrors.end_date = 'End Date cannot be earlier than Start Date';
    }
    if(formData.work_days.length == 0) newErrors.work_days = 'Days are required';
    if (!formData.duration_in_hours) {
      newErrors.duration_in_hours = 'Duration is required';
    }else if(formData.duration_in_hours <= 0){
      newErrors.duration_in_hours = 'Duration cannot be less than 0.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

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
    for (let day of selectedDay) {
      if (day.day == 'everyday') {
        everyday = true;
        days = ['everyday'];
      } else {
        days.push(day.day);
      }
    }
    setFormData((prev) => ({
      ...prev,
      work_days: days
    }));
  };

  const handlePostRequest = async () => {
    const url = 'http://127.0.0.1:8080/main_goal';
    try {
      const response = await axios.post(url, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('There was an error!', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(validateForm()){
      //handle submit
      handlePostRequest();
      setState(!state);
      setFormData({
        title: '',
        start_date: '',
        end_date: '',
        work_days: [],
        duration_in_hours: '',
        urgent: false,
        important: false,
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
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
        error={!!errors.start_date}
        helperText={errors.start_date}
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
        error={!!errors.end_date}
        helperText={errors.end_date}
        sx={{ mb: 2 }}
      />
      <FormControl fullWidth sx={{ mb: 2 }}>
        <MultipleDays reset={state} onChange={handleDaysChange} errors={errors} />
      </FormControl>
      <TextField
        fullWidth
        label="Duration in Hours"
        name="duration_in_hours"
        type="number"
        step="0.1"
        value={formData.duration_in_hours}
        onChange={handleChange}
        error={!!errors.duration_in_hours}
        helperText={errors.duration_in_hours}
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
