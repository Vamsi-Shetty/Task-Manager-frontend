import { useState } from "react";
import {
    Card,
    CardContent,
    TextField,
    Button,
    Checkbox,
    Chip,
    Box,
    Typography,
    IconButton,
    FormControlLabel
} from "@mui/material";
import {
    Edit,
    Delete,
    Check,
    Close,
    Save,
    CalendarToday,
    CheckCircle,
    RadioButtonUnchecked
} from "@mui/icons-material";
import PropTypes from 'prop-types';

const Task = ({ task, onEdit, onDelete }) => {
    const [editing, setEditing] = useState(false);
    const [title, setTitle] = useState(task.title);
    const [description, setDescription] = useState(task.description);
    const [completed, setCompleted] = useState(task.completed);

    const handleEdit = () => {
        if (editing) {
            onEdit(task._id, { title, description, completed });
        }
        setEditing(!editing);
    };

    const handleDelete = () => {
        onDelete(task._id);
    };

    const handleCancel = () => {
        setTitle(task.title);
        setDescription(task.description);
        setCompleted(task.completed);
        setEditing(false);
    };

    return (
        <Card
            sx={{
                borderLeft: 4,
                borderColor: task.completed ? 'success.main' : 'primary.main',
                bgcolor: task.completed ? 'success.50' : 'primary.50',
                transition: 'all 0.3s ease',
                '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 3
                }
            }}
        >
            <CardContent>
                {editing ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                        <TextField
                            label="Task Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            fullWidth
                            variant="outlined"
                        />
                        <TextField
                            label="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            fullWidth
                            multiline
                            rows={3}
                            variant="outlined"
                        />
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={completed}
                                    onChange={(e) => setCompleted(e.target.checked)}
                                    color="success"
                                />
                            }
                            label="Mark as completed"
                        />
                        <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                            <Button
                                variant="contained"
                                color="success"
                                startIcon={<Save />}
                                onClick={handleEdit}
                                sx={{ minWidth: 100 }}
                            >
                                Save
                            </Button>
                            <Button
                                variant="outlined"
                                color="inherit"
                                startIcon={<Close />}
                                onClick={handleCancel}
                                sx={{ minWidth: 100 }}
                            >
                                Cancel
                            </Button>
                        </Box>
                    </Box>
                ) : (
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 2 }}>
                        <Box sx={{ flex: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 'bold',
                                        textDecoration: task.completed ? 'line-through' : 'none',
                                        color: task.completed ? 'success.main' : 'text.primary'
                                    }}
                                >
                                    {task.title}
                                </Typography>
                                {task.completed && <CheckCircle color="success" />}
                            </Box>
                            <Typography
                                variant="body1"
                                sx={{
                                    color: 'text.secondary',
                                    mb: 2,
                                    textDecoration: task.completed ? 'line-through' : 'none'
                                }}
                            >
                                {task.description}
                            </Typography>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                <Chip
                                    icon={task.completed ? <Check /> : <RadioButtonUnchecked />}
                                    label={task.completed ? 'Completed' : 'Pending'}
                                    color={task.completed ? 'success' : 'warning'}
                                    size="small"
                                    variant="outlined"
                                />
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <CalendarToday fontSize="small" color="action" />
                                    <Typography variant="caption" color="text.secondary">
                                        {new Date(task.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                            </Box>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                                color="primary"
                                onClick={() => setEditing(true)}
                                title="Edit task"
                                sx={{
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <Edit />
                            </IconButton>
                            <IconButton
                                color="error"
                                onClick={handleDelete}
                                title="Delete task"
                                sx={{
                                    '&:hover': {
                                        transform: 'scale(1.1)'
                                    },
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <Delete />
                            </IconButton>
                        </Box>
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

Task.propTypes = {
    task: PropTypes.object.isRequired,
    onEdit: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired
};

export default Task;