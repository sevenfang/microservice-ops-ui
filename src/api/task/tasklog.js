import fetch from 'utils/fetch';
export function page(query) {
    return fetch({
        url: '/task/tasklogs.json',
        method: 'get',
        params: query
    });
}