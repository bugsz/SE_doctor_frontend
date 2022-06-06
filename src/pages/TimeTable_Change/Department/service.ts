import { request } from 'umi';

export async function ListDepartment(params) {
  return request("/api/TimeTable_Change/getDepartment", {
    method: "GET",
    params: { ...params },
  })
}
// export async function DeleteDoctor(params) {
//   return request("/api/TimeTable_Change/delete", {
//     method: "DELETE",
//     params: {...params},
//   }
//   );
// }

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
