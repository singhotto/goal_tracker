// FormDialog.js
import React from 'react';
import { Dialog, DialogContent } from '@mui/material';

const FormDialog = ({ open, onClose, Form }) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            sx={{ 
                '& .MuiDialogContent-root': { padding: 3 }, // Padding for DialogContent
                '& .MuiDialogTitle-root': { padding: '8px 28px' }, // Padding for DialogTitle
                '& .MuiDialog-paper': { padding: 2 } // Padding for Dialog container
            }}
        >
            <DialogContent>
                {Form && <Form />}
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;
