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
        const response = await axios.get('http://127.0.0.1:8080/daily_goal');
        setGoalList(response.data);
      } catch (error) {
        console.error('There was an error fetching the goals!', error);
      }
    };

    fetchGoals();
  }, []);

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleRemove = async (id) => {
    try {
      // Make the DELETE request using axios
      const response = await axios.delete(`http://127.0.0.1:8080/daily_goal/${id}`);
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
      const response = await axios.put(`http://127.0.0.1:8080/daily_goal/${data.id}`, data, {
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
            <TableCell>Title</TableCell>
            <TableCell>Main Goal</TableCell>
            <TableCell>Start Time</TableCell>
            <TableCell>End Time</TableCell>
            <TableCell>Date</TableCell>
            <TableCell>Duration (Hours)</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Completed</TableCell>
            <TableCell>Remove</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {goalList.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.title}</TableCell>
              <TableCell>{item?.main_goal}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>{item.end_time}</TableCell>
              <TableCell>{formatDate(new Date(item.date))}</TableCell>
              <TableCell>{item.duration_in_hours}</TableCell>
              <TableCell
                style={{ maxWidth: '150px', overflow: 'hidden', textOverflow: 'ellipsis' }}
              >
                {item.description.length > 300
                  ? `${item.description.substring(0, 300)}...`
                  : item.description}
              </TableCell>
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
