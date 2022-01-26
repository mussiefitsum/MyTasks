async function putStatus(taskId, newStatus) {
    const res = await fetch('http://localhost:3001/api/status', {
        method: 'PUT',
        credentials: 'include',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ id: taskId, status: newStatus })
    })
    const data = await res.json();
}

export default putStatus