export default function filterTasks(tasks, status) {
    return tasks.filter(task => task.status === status);
}