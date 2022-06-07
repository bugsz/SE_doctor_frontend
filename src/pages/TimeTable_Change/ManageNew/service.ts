import { request } from 'umi';

export async function ListSchedule(params) {
  console.log(params);
  return request("/api/admin/schedule/get", {
    method: "GET",
    params: { ...params },
  })
}
// export async function ListSchedule(department, data, options) {
//   return request("/api/admin/schedule/get", {
//     method: "GET",
//     params: { department: department },
//   })
// }

export async function DeleteSchedule(params) {
  return request("/api/TimeTable_Change/deleteSchedule", {
    method: "DELETE",
    params: {...params},
  }
  );
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
