import React, { useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Checkbox,
  IconButton,
  Paper,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const MainTable = ({ data, onComplete, onRemove }) => {
  const [goalList, setGoalList] = React.useState([]);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8080/main_goal');
        setGoalList(response.data);
      } catch (error) {
        console.error('There was an error fetching the goals!', error);
      }
    };

    fetchGoals();
  }, []);

  const handleRemove = async (id) => {
    try {
      // Make the DELETE request using axios
      const response = await axios.delete(`http://127.0.0.1:8080/main_goal/${id}`);
      setGoalList((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error('There was an error deleting the item!', error);
      // Optionally, display an error message to the user
      alert('Failed to delete the item. Please try again.');
    }
  };

  const handleComplete = async (index) => {
    try {
      // Make the UPDATE request using axios
      let data = goalList[index];
      data.completed = !data.completed;
      const response = await axios.put(`http://127.0.0.1:8080/main_goal/${data.id}`, data, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setGoalList((prev) =>
        prev.map((item, i) =>
          i === index ? { ...item, completed: item.completed } : item
        )
      );
    } catch (error) {
      console.error('There was an error deleting the item!', error);
      // Optionally, display an error message to the user
      alert('Failed to delete the item. Please try again.');
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Start Date</TableCell>
            <TableCell>End Date</TableCell>
            <TableCell>Work Days</TableCell>
            <TableCell>Duration (Hours)</TableCell>
            <TableCell>Urgent</TableCell>
            <TableCell>Important</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goalList.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item.start_date}</TableCell>
              <TableCell>{item.end_date}</TableCell>
              <TableCell>{item.work_days?.join(", ")}</TableCell>
              <TableCell>{item.duration_in_hours}</TableCell>
              <TableCell>{item.urgent ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.important ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Checkbox
                  checked={item.completed}
                  onChange={() => handleComplete(index)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => handleRemove(item.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MainTable;
