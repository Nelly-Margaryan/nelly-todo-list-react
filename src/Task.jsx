
function Task (){
    const title = "What should be done?";
    const number = 0;
    return (
        <div className="task-block">
            <h4>{title}</h4>
            <input type="text"/>
            <div className="task-add-btn">
                <button>Add #{number+1}</button>
            </div>
            
        </div>
    );
}

export default Task;