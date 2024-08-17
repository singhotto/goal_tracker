import React, { useState } from 'react';
import { Grid, Box, Paper } from '@mui/material';

import { DailyTable } from '../components';

const DailyGoals = () => {
  const [data, setData] = useState([]);

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
        {/* Table goes here */}
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <DailyTable data={data} onComplete={handleComplete} onRemove={handleRemove} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DailyGoals;
