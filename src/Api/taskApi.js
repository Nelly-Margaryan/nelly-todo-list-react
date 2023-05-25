import Api from "./api";


const taskApiUrl = process.env.REACT_APP_API_URL + "/task";

export default class TaskApi extends Api{
    constructor(){
        super(taskApiUrl);
    }

    getAll(filters) {
        return this.request("GET", { filters: filters });
    }

    getSingle(taskId) {
        return this.request("GET", { params: taskId });
    }

    add(task) {
        return this.request("POST", { body: task });
    }
    update(editedTask) {
        return this.request("PUT", { body: editedTask, params: editedTask._id });
    }
    delete(taskId) {
        return this.request("DELETE", { params: taskId });
    }
    deleteMany(taskIds) {
        return this.request("PATCH", { body: { tasks: taskIds } });
    }
}