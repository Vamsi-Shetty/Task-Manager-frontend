import { useState } from "react";
import { Card, CardContent, Typography, TextField, Button, Box, Alert } from '@mui/material';
import { Add, ErrorOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';

const AddForm = ({ onAddTask, loading, error }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (title.trim() && description.trim()) {
            onAddTask({ title, description });
            setTitle("");
            setDescription("");
        }
    };

    return (
        <Card sx={{ mb: 4, boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Add sx={{ mr: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2">
                        Create New Task
                    </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Add a new task to your list
                </Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        label="Task Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        fullWidth
                        variant="outlined"
                    />
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        fullWidth
                        multiline
                        rows={4}
                        variant="outlined"
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        sx={{ mt: 2, py: 1.5 }}
                        startIcon={<Add />}
                    >
                        {loading ? 'Adding Task...' : 'Add Task'}
                    </Button>
                </Box>
                {error && (
                    <Alert severity="error" sx={{ mt: 2 }} icon={<ErrorOutline />}>
                        {error}
                    </Alert>
                )}
            </CardContent>
        </Card>
    );
};

AddForm.propTypes = {
    onAddTask: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string
};

export default AddForm;