export default function filterTasks(tasks, status) {
    if (status === 'Recent') {
        return tasks;
    } else {
        return tasks.filter(task => task.status === status);
    }
}