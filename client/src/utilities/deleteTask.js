async function deleteTask(taskId) {
    await fetch('http://localhost:3001/api/task', {
        method: 'DELETE',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: taskId })
    });
}

export default deleteTask;