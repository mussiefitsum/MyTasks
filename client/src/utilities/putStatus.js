async function putStatus(taskId, newStatus) {
    try {
        const res = await fetch('http://localhost:3001/api/status', {
            method: 'PUT',
            credentials: 'include',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id: taskId, status: newStatus })
        });
        if (res.ok) return res
    } catch (err) {
        console.log(err);
    }
}

export default putStatus