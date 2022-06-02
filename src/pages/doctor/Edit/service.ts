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
    params: {doctor_id: id},
  })
};

export async function ModifyDoctorInfo(id, data, options) {
  return request("/api/doctor/modify", {
    method: "POST",
    params: {doctor_id: id},
    data: data,
  });
}