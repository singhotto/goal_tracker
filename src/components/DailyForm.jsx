import React, { useEffect, useState } from 'react';
import {
  TextField,
  MenuItem,
  FormControl,
  Select,
  Button,
  Box,
} from '@mui/material';
import axios from 'axios';


const DailyForm = () => {
  const [state, setState] = useState(false);
  const [errors, setErrors] = useState({});
  const [mainGoals, setMainGoals] = useState([{ id: 0, title: "No Goal" }]);
  const [currGoal, setCurrGoal] = useState({ id: 0, title: "No Goal" });
  const [formData, setFormData] = useState({
    title: '',
    start_time: '',
    end_time: '',
    date: '',
    main_goal_id: currGoal.id,
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
    if (!formData.duration_in_hours) {
      newErrors.duration_in_hours = 'Duration is required';
    }else if(formData.duration_in_hours <= 0){
      newErrors.duration_in_hours = 'Duration cannot be less than 0.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/main_goal/titles');
        setMainGoals([...mainGoals, ...response.data]);
      } catch (error) {
        console.error('There was an error fetching the goals!', error);
      }
    };

    fetchGoals();
  }, []);


  const handlePostRequest = async () => {
    const url = 'http://127.0.0.1:8080/daily_goal';
    try {
      if(mainGoals.id == 0){
        setFormData((prev) => ({
          ...prev,
          main_goal: null,
        }));
      }
      console.log("Form data to send: ", formData);
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
    let { name, value, type, checked } = e.target;
    if(name == "main_goal_id" && value != "No Goal"){
      for(let t of mainGoals){
        if(t.title == value){
          value = t.id;
          setCurrGoal(t);
          break;
        }
      }
    }
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleTextArea = (e) => {
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
        date: '',
        main_goal_id: currGoal.id,
        duration_in_hours: '',
        description: ''
      });
      setCurrGoal({ id: 0, title: "No Goal" });
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mb: 1 }}>
      <TextField
        fullWidth
        label="Title"
        name="title"
        value={formData.title}
        onChange={handleChange}
        error={!!errors.title}
        helperText={errors.title}
        sx={{ mb: 1 }}
      />
      <FormControl fullWidth sx={{ mb: 1 }}>
        <Select
          name="main_goal_id"
          value={currGoal.title}
          onChange={handleChange}
        >
          {mainGoals.map((goal, index) => (
            <MenuItem key={index} value={goal.title}>{goal.title}</MenuItem>
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
        error={!!errors.date}
        helperText={errors.date}
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
        error={!!errors.duration_in_hours}
        helperText={errors.duration_in_hours}
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

export default DailyForm;
