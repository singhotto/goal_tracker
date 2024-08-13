import React, { useState } from 'react';
import { Grid, Box, Paper } from '@mui/material';

import { MainForm, MainTable } from '../components';

const MainGoals = () => {
  const [data, setData] = useState([]);

  const handleFormSubmit = (formData) => {
    setData((prev) => [
      ...prev,
      { ...formData, completed: false },
    ]);
  };

  const handleComplete = (index) => {
    setData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleRemove = (index) => {
    setData((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <Box sx={{ flexGrow: 1, p: 2 }}>
      <Grid container spacing={2} justifyContent="center">
        {/* Form goes here */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <MainForm onSubmit={handleFormSubmit} />
          </Paper>
        </Grid>

        {/* Table goes here */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <MainTable data={data} onComplete={handleComplete} onRemove={handleRemove} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MainGoals;
