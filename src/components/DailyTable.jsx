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
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell>{item.name}</TableCell>
              <TableCell>{item.start_time}</TableCell>
              <TableCell>{item.end_time}</TableCell>
              <TableCell>{item.date}</TableCell>
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
