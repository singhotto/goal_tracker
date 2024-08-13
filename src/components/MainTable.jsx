import React from 'react';
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

const MainTable = ({ data, onComplete, onRemove }) => {
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
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.start_date}</TableCell>
              <TableCell>{item.end_date}</TableCell>
              <TableCell>{item.work_days.join(", ")}</TableCell>
              <TableCell>{item.duration_in_hours}</TableCell>
              <TableCell>{item.urgent ? 'Yes' : 'No'}</TableCell>
              <TableCell>{item.important ? 'Yes' : 'No'}</TableCell>
              <TableCell>
                <Checkbox
                  checked={item.completed}
                  onChange={() => onComplete(index)}
                />
              </TableCell>
              <TableCell>
                <IconButton onClick={() => onRemove(index)}>
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
