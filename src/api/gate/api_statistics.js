import fetch from 'utils/fetch';

export function statistic_list(query) {
    return fetch({
        url: 'apiUrl/url/statistic',
        method: 'get',
        params: query
    });
}

export function traffic_list(query) {
    return fetch({
        url: 'apiUrl/url/traffic',
        method: 'get',
        params: query
    });
}

export function customTraffic_list(query) {
    return fetch({
        url: 'apiUrl/url/customTraffic',
        method: 'get',
        params: query
    });
}