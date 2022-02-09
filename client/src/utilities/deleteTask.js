import baseUrl from './baseUrl'

async function deleteTask(taskId) {
    try {
        const res = await fetch(`${ baseUrl }/api/task/${ taskId }`, {
            method: 'DELETE',
            credentials: 'include'
        });
        if (res.ok) return res
    } catch (err) {
        console.log(err);
    }
}

export default deleteTask;