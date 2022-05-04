import { request } from 'umi';

// TODO 更新一下
export async function queryCurrent() {
    return request('/api/user/me', {
      method: 'GET',
    });
  }

  // export async function query() {
  //   return request('/api/users');
  // }
  
  export async function updateInfo(body) {
    return request('/api/user/me', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
    });
  }
  