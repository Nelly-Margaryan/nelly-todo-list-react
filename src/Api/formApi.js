import Api from "./api";


const formApiUrl = process.env.REACT_APP_API_URL + "/form";

export default class FormApi extends Api {
    constructor() {
        super(formApiUrl);
    }
    sendForm(form) {
        return this.request("POST", { body: form });
    }

}