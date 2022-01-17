import './Form.css'

function Form({ toggleForm }) {
    return (
        <div className="Form">
            <div className="Form-content">
                <div className="Form-cancel">
                    <i onClick={toggleForm} className="fas fa-times-circle"></i>
                </div>
                <div className="Form-group">
                    <label htmlFor="task">Task</label>
                    <br />
                    <input id="task" name="task" type="text" className="Form-input" placeholder="Enter your task" required />
                </div>
                <div className="Form-group">
                    <label htmlFor="description">Description</label>
                    <br />
                    <textarea id="description" name="description" className="Form-description">Enter your task description</textarea>
                </div>
                <div className="Form-group">
                    <label htmlFor="category">Category</label>
                    <br />
                    <input id="category" name="category" type="text" className="Form-input" />
                </div>
                <button className="Form-button">Create Task</button>
            </div>
        </div>
    )
}

export default Form;