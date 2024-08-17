import React, { useEffect, useState } from 'react';
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
import axios from 'axios';


const TaskForm = () => {
  const [errors, setErrors] = useState({});
  const [state, setState] = useState(false);
  const [currDate, setCurrDate] = useState(new Date());

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getCurrentDate = () => {
    return formatDate(new Date());
  };

  const [formData, setFormData] = useState({
    title: '',
    start_time: '',
    end_time: '',
    date: getCurrentDate(),
    duration_in_hours: '',
    description: ''
  });

  const validateForm = () => {
    const newErrors = {};
    const today = new Date().toISOString().split('T')[0];

    if (!formData.title) newErrors.title = 'Title is required';
    if (!formData.date){
      newErrors.date = 'Date is required';
    }else if(formData.date < today){
      newErrors.date = 'Date cannot be earlier than Today';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePostRequest = async () => {
    const url = 'http://127.0.0.1:8080/task';
    try {
      console.log("Before: ", formData)
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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTextArea = (e) =>{
    setFormData((prev) => ({
      ...prev,
      description: e.target.value
    }));
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if(validateForm()){
      handlePostRequest();
      setState(!state);
      setFormData({
        title: '',
        start_time: '',
        end_time: '',
        date: getCurrentDate(),
        duration_in_hours: '',
        description: ''
      });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        type="text"
        InputLabelProps={{ shrink: true }}
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.date}
        onChange={handleChange}
        error={!!errors.date}
        helperText={errors.date}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="Start Time"
        name="start_time"
        type="time"
        InputLabelProps={{ shrink: true }}
        value={formData.start_time}
        onChange={handleChange}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="End Time"
        name="end_time"
        type="time"
        InputLabelProps={{ shrink: true }}
        value={formData.end_time}
        onChange={handleChange}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="Description"
        multiline
        rows={3} // Number of visible rows
        value={formData.description}
        onChange={handleTextArea}
        sx={{ mb: 1 }}
      />

      <Button type="submit" variant="contained">Submit</Button>
    </Box>
  );
};

export default TaskForm;
