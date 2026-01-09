import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Grid, Typography, Box } from '@mui/material';
import { Task as TaskIcon, Rocket } from '@mui/icons-material';
import AddForm from '../components/AddForm';
import DisplayTasks from '../components/DisplayTasks';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

const TaskManager = () => {
    const [tasks, setTasks] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [sortBy, setSortBy] = useState("createdAt");
    const [sortOrder, setSortOrder] = useState("desc");
    const [completedFilter, setCompletedFilter] = useState("");

    const getTasks = async (params = {}) => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(`${API_BASE_URL}/task`, { params });
            setTasks(response.data.tasks);
            setTotal(response.data.total);
            setPage(response.data.page);
            setTotalPages(response.data.totalPages);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const addTask = async (taskData) => {
        setLoading(true);
        setError(null);
        try {
            await axios.post(`${API_BASE_URL}/task/create`, taskData);
            getTasks({ page, sortBy, sortOrder, completed: completedFilter || undefined });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const editTask = async (taskId, taskData) => {
        setLoading(true);
        setError(null);
        try {
            await axios.patch(`${API_BASE_URL}/task/edit/${taskId}`, taskData);
            getTasks({ page, sortBy, sortOrder, completed: completedFilter || undefined });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const deleteTask = async (taskId) => {
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`${API_BASE_URL}/task/delete/${taskId}`);
            getTasks({ page, sortBy, sortOrder, completed: completedFilter || undefined });
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getTasks();
    }, []);

    const handlePageChange = (newPage) => {
        setPage(newPage);
        getTasks({ page: newPage, sortBy, sortOrder, completed: completedFilter || undefined });
    };

    const handleSortChange = (newSortBy, newSortOrder) => {
        setSortBy(newSortBy);
        setSortOrder(newSortOrder);
        getTasks({ page: 1, sortBy: newSortBy, sortOrder: newSortOrder, completed: completedFilter || undefined });
    };

    const handleFilterChange = (value) => {
        setCompletedFilter(value);
        getTasks({ page: 1, sortBy, sortOrder, completed: value || undefined });
    };

    return (
        <Container maxWidth="xl" sx={{ py: 4 }}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
                    <TaskIcon sx={{ fontSize: 48, color: 'primary.main', mr: 2 }} />
                    <Typography variant="h3" component="h1" sx={{
                        background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        fontWeight: 'bold'
                    }}>
                        TaskFlow Pro
                    </Typography>
                </Box>
                <Typography variant="h6" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                    <Rocket color="warning" />
                    Elevate your productivity with intelligent task management
                </Typography>
            </Box>
            <Grid container spacing={4}>
                <Grid size={{ xs: 12, md: 4 }}>
                    <AddForm onAddTask={addTask} loading={loading} error={error} />
                </Grid>
                <Grid size={{ xs: 12, md: 8 }}>
                    <DisplayTasks
                        tasks={tasks}
                        total={total}
                        page={page}
                        totalPages={totalPages}
                        loading={loading}
                        error={error}
                        sortBy={sortBy}
                        sortOrder={sortOrder}
                        completedFilter={completedFilter}
                        onPageChange={handlePageChange}
                        onSortChange={handleSortChange}
                        onFilterChange={handleFilterChange}
                        onEditTask={editTask}
                        onDeleteTask={deleteTask}
                    />
                </Grid>
            </Grid>
        </Container>
    );
};

export default TaskManager;