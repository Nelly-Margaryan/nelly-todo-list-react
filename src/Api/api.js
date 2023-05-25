
export default class Api {
    constructor(url) {
        this.#url = url;
    }
    #url = null;

    request(method, data = {}) {
        const { body, params, filters } = data;
        const req = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
        }

        if (body) {
            req.body = JSON.stringify(body);
        }

        let url = this.#url;

        if (params) {
            url = `${url}/${params}`
        }

        if (filters) {
            let query = '?';
            Object.entries(filters)
                .forEach(([key, value]) => {
                    if (!value) {
                        return;
                    }
                    query += `${key}=${value}&`;
                });
            url += query;
        }

        return fetch(url, req)
            .then((result) => result.json())
            .then((data) => {
                if (data.error) {
                    throw data.error;
                }
                return data;
            });
    }
}