import { request } from 'umi';

export async function ListDoctor(params) {
  return request("/api/doctor/get", {
    method: "GET",
    params: { ...params },
  })
}



export async function ListUser(params) {
  return request('/api/users/list', {
    method: 'GET',
    params: { ...params },
  });
}
// export async function DeleteUser(params) {
//   return request('/api/users/user', {
//     method: 'DELETE',
//     data: {
//       ...params,
//     },
//   });
// }

// export async function ChangeRole(params) {
//   return request('/api/users/role', {
//     method: 'PUT',
//     data: {
//       ...params,
//     },
//   });
// }

// export async function QueryNum() {
//   return request('/api/users/num', {
//     method: 'GET',
//   });
// }

// export async function Register(data) {
//   return request('/api/user/register', {
//     method: 'POST',
//     data: data,
//   });
// }
