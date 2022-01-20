import './Cards.css'

function Cards({ task }) {
    return (
        <div className="Cards">
            <span>{task.status}</span>
            <h3>{task.name}</h3>
            <h5>{task.category !== '' ? task.category : 'Uncategorized'}</h5>
            <p>{task.description}</p>
        </div>
    )
}

export default Cards;