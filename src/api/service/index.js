import fetch from 'utils/fetch';

export function getService() {
    return fetch({
        url: '/api/service/allInst',
        method: 'get'
    })
}
