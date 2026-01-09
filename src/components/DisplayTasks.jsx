import { Card, CardContent, Typography, Box, FormControl, Select, MenuItem, Alert, CircularProgress, Pagination } from '@mui/material';
import { List, FilterList, Sort, ErrorOutline } from '@mui/icons-material';
import PropTypes from 'prop-types';
import Task from "./Task";

const DisplayTasks = ({
    tasks,
    total,
    page,
    totalPages,
    loading,
    error,
    sortBy,
    sortOrder,
    completedFilter,
    onPageChange,
    onSortChange,
    onFilterChange,
    onEditTask,
    onDeleteTask
}) => {
    return (
        <Card sx={{ boxShadow: 3 }}>
            <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <List sx={{ mr: 2, color: 'primary.main' }} />
                        <Typography variant="h5" component="h3">
                            Your Tasks
                        </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                        {total} total tasks
                    </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Sort color="action" />
                        <Typography variant="body2">Sort by:</Typography>
                        <FormControl size="small">
                            <Select
                                value={sortBy}
                                onChange={(e) => onSortChange(e.target.value, sortOrder)}
                            >
                                <MenuItem value="createdAt">Created Date</MenuItem>
                                <MenuItem value="completed">Status</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                    <FormControl size="small">
                        <Select
                            value={sortOrder}
                            onChange={(e) => onSortChange(sortBy, e.target.value)}
                        >
                            <MenuItem value="desc">Descending</MenuItem>
                            <MenuItem value="asc">Ascending</MenuItem>
                        </Select>
                    </FormControl>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <FilterList color="action" />
                        <Typography variant="body2">Filter:</Typography>
                        <FormControl size="small">
                            <Select
                                value={completedFilter}
                                onChange={(e) => onFilterChange(e.target.value)}
                            >
                                <MenuItem value="">All Tasks</MenuItem>
                                <MenuItem value="true">Completed</MenuItem>
                                <MenuItem value="false">Pending</MenuItem>
                            </Select>
                        </FormControl>
                    </Box>
                </Box>

                {loading && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
                        <CircularProgress />
                        <Typography sx={{ ml: 2 }}>Loading tasks...</Typography>
                    </Box>
                )}

                {error && (
                    <Alert severity="error" sx={{ mb: 4 }} icon={<ErrorOutline />}>
                        {error}
                    </Alert>
                )}

                {!loading && !error && tasks.length === 0 && (
                    <Box sx={{ textAlign: 'center', py: 8 }}>
                        <List sx={{ fontSize: 64, color: 'grey.300', mb: 2 }} />
                        <Typography variant="h6" color="text.secondary">
                            No tasks found
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Create your first task to get started!
                        </Typography>
                    </Box>
                )}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
                    {tasks.map((task) => (
                        <Box key={task._id} sx={{ flex: '1 1 300px', maxWidth: '400px' }}>
                            <Task task={task} onEdit={onEditTask} onDelete={onDeleteTask} />
                        </Box>
                    ))}
                </Box>

                {totalPages > 1 && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', pt: 2 }}>
                        <Pagination
                            count={totalPages}
                            page={page}
                            onChange={(event, value) => onPageChange(value)}
                            color="primary"
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

DisplayTasks.propTypes = {
    tasks: PropTypes.arrayOf(PropTypes.object).isRequired,
    total: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    loading: PropTypes.bool.isRequired,
    error: PropTypes.string,
    sortBy: PropTypes.string.isRequired,
    sortOrder: PropTypes.string.isRequired,
    completedFilter: PropTypes.string,
    onPageChange: PropTypes.func.isRequired,
    onSortChange: PropTypes.func.isRequired,
    onFilterChange: PropTypes.func.isRequired,
    onEditTask: PropTypes.func.isRequired,
    onDeleteTask: PropTypes.func.isRequired
};

export default DisplayTasks;