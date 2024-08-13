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


const MainForm = ({ onSubmit }) => {
  const [state, setState] = useState(false);
  const [mainGoals, setMainGoals] = useState([ 'No Goal', 'goal1', 'goal2', 'goal3', 'goal4', 'goal5']);
  const [formData, setFormData] = useState({
    name: '',
    start_time: '',
    end_time: '',
    date: '',
    main_goal: mainGoals[0],
    duration_in_hours: '',
    description: ''
  });



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
    console.log(formData)
    onSubmit(formData);
    setState(!state);
    setFormData({
      name: '',
      start_time: '',
      end_time: '',
      date: '',
      main_goal: mainGoals[0],
      duration_in_hours: '',
      description: ''
    });
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
      <TextField
        fullWidth
        label="Name"
        name="name"
        value={formData.name}
        onChange={handleChange}
        sx={{ mb: 1 }}
      />
      <FormControl fullWidth sx={{ mb: 1 }}>
        <Select
          name="main_goal"
          value={formData.main_goal}
          onChange={handleChange}
        >
          {mainGoals.map((goal, index) => (
            <MenuItem key={index} value={goal}>{goal}</MenuItem>
          ))}
        </Select>
      </FormControl>
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
        label="Date"
        name="date"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={formData.end_date}
        onChange={handleChange}
        sx={{ mb: 1 }}
      />
      <TextField
        fullWidth
        label="Duration in Hours"
        name="duration_in_hours"
        type="number"
        step="0.1"
        value={formData.duration_in_hours}
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

export default MainForm;
