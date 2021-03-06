import { request } from 'umi';
import { registerReqType } from './data';

export async function GetDoctorId(params: {}) {
  return request("/api/me", {
    method: "GET",
    params: { ...params },
  })
}

export async function GetPatientRegisterList(params: registerReqType) {
  console.log(params)
  return request("/api/register/get", {
    method: "GET",
    params: {...params},
  });
}

// export async function ListDoctor(params) {
//   return request("/api/doctor/get", {
//     method: "GET",
//     params: { ...params },
//   })
// }
// export async function DeleteDoctor(params) {
//   return request("/api/doctor/delete", {
//     method: "DELETE",
//     params: {...params},
//   }
//   );
// }



