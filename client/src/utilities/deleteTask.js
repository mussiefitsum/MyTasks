async function deleteTask(taskId) {
    await fetch(`http://localhost:3001/api/task/${ taskId }`, {
        method: 'DELETE',
        credentials: 'include'
    });
}

export default deleteTask;