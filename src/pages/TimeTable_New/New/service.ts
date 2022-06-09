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

export async function UpdateDoctorInfo(params: {
  schedule_id: string;
  department: string;
  time: string;
  doctor_id: string;
}) {
  return request('/api/admin/schedule/upload', {
    method: 'POST',
    params: { ...params },
  });
}

export async function AddDoctorInfo(params: {
  date: string;
  time: string;
  depart_id: string;
  doctor_id: string;
  quota: number;
}) {
  console.log("add");
  console.log(params);
  return request("/api/admin/schedule/create", {
    method: "POST",
    data: { ...params },
  });
}