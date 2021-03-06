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

export async function ListDoctorDetails(id, data, options) {
  console.log(id);
  console.log(options);
  return request("/api/doctor/details", {
    method: "GET",
    params: {id: id},
  })
};

export async function UpdateDoctorInfo(id, data, options) {
  return request("/api/doctor/update", {
    method: "POST",
    params: {id: id},
    data: data,
  });
}