import fetch from 'utils/fetch';
export function addObj(obj) {
  return fetch({
    url: '/task/save.json',
    method: 'post',
    data: obj
  });
}
export function getTasklist(obj) {
  return fetch({
    url: '/task/list.json',
    method: 'get',
    data: obj
  });
}

export function delObj(jobName,jobGroup) {
  return fetch({
    url: '/task/delete/'+jobName+'/'+jobGroup, 
    method: 'delete'
  })
}

export function putStop(jobName, jobGroup) {
  return fetch({
    url:'/task/stopJob?jobName='+jobName+'&jobGroup='+jobGroup, 
    method: 'get',
  })
}

export function resume(jobName, jobGroup) {
  return fetch({
    url:'/task/resume?jobName='+jobName+'&jobGroup='+jobGroup, 
    method: 'get',
  })
}