import {Project} from "../model/Project";


const baseUrl = 'http://localhost:4000'
const url = `${baseUrl}/projects`;

function translateStatusToErrorMessage(status: number) {

    switch (status) {
        case 401:
            return 'Please log in.';
        case 403:
            return 'Forbidden request.';
        default:
            return 'Internal issue happened.';
    }
}

function checkStatus(response: any) {
    if (response.ok) {
        return response;
    } else {
        const httpErrorInfo = {
            status: response.status,
            statusText: response.statusText,
            url: response.url,
        };
        let errorMsg = translateStatusToErrorMessage(httpErrorInfo.status);
        throw new Error(errorMsg);
    }
}

function parseJSON(response: any) {
    return response.json();
}

function delay(ms: number) {
    return function (x: any): Promise<any> {
        return new Promise((resolve) => setTimeout(() => resolve(x), ms));
    };
}

function toModel(item: any): Project {
    return new Project(item);
}

function toModels(data: any[]): Project[] {
    return data.map(toModel);
}

const projectAPI = {
    get(page = 1, limit = 20) {
        return fetch(`${url}?_page=${page}&_limit=${limit}&sort=name`)
            .then(delay(600))
            .then(checkStatus)
            .then(parseJSON)
            .then(toModels)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error('Error occurred.');
            });
    },

    put(project: Project) {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(checkStatus)
            .then(parseJSON)
            .catch((error: TypeError) => {
                console.log('log client error: ' + error);
                throw new Error('There was error during updating the project. Please try again.')
            });
    },

    find(id: number) {
        return fetch(`${url}/${id}`)
            .then(delay(100))
            .then(checkStatus)
            .then(parseJSON)
            .then(toModel)
            .catch((error: TypeError) => {
                console.log('log client error' + error);
                throw new Error('Error occurred.');
            });
    },
};

export {projectAPI};
