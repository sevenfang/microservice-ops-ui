import fetch from 'utils/fetch';
export function page(query) {
    return fetch({
        url: '/api/task/taskManager/tasklogs.json',
        method: 'get',
        params: query
    });
}