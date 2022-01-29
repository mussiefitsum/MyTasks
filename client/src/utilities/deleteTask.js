async function deleteTask(taskId) {
    try {
        const res = await fetch(`http://localhost:3001/api/task/${ taskId }`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (res.ok) return res
    } catch (err) {
        console.log(err);
    }
}

export default deleteTask;