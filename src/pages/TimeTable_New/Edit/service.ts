import { request } from 'umi';

// TODO 更新一下
// export async function queryCurrent() {
//     return request('/api/user/me', {
//       method: 'GET',
//     });
//   }

//   export async function updateInfo(body) {
//     return request('/api/user/me', {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       data: body,
//     });
//   }

export async function ListDoctorDetails(id: string) {
  console.log(id);
  // console.log(options);
  return request('/api/TimeTable_Change/details', {
    method: 'GET',
    params: { id: id },
  });
}
