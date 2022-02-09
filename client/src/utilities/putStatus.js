import baseUrl from './baseUrl'

async function putStatus(taskId, newStatus) {
    try {
        const res = await fetch(`${ baseUrl }/api/status`, {
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