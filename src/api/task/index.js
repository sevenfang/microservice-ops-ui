import fetch from 'utils/fetch';
export function addObj(obj) {
  return fetch({
    url: '/api/task/taskManager/save.json',
    method: 'post',
    data: obj
  });
}
export function getTasklist(query) {
  return fetch({
    url: '/api/task/taskManager/list.json',
    method: 'get',
    params: query
  });
}

export function delObj(jobName,jobGroup) {
  return fetch({
    url: '/api/task/taskManager/delete/'+jobName+'/'+jobGroup, 
    method: 'delete'
  })
}

export function putStop(jobName, jobGroup) {
  return fetch({
    url:'/api/task/taskManager/stopJob?jobName='+jobName+'&jobGroup='+jobGroup, 
    method: 'get',
  })
}

export function resume(jobName, jobGroup) {
  return fetch({
    url:'/api/task/taskManager/resume?jobName='+jobName+'&jobGroup='+jobGroup, 
    method: 'get',
  })
}