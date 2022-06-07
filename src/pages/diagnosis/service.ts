import { request } from 'umi';
import type { diagnosisType, patientInfoType } from './data';

// export async function queryPatientInfo(params: {
//   id?: string;
// })/*: Promise<{ data: patientInfoType }> */{
//   console.log({user_id: params.id})
//   const res = await request('/api/doctor/patient_info/get', {
//     params: {user_id: params.id},
//   });
//   console.log(res)
//   return res
// }

export async function queryPatientInfo(id?: string): Promise<patientInfoType> {
  console.log({user_id: id})
  const res = await request('/api/doctor/patient_info/get', {
    params: {user_id: id},
  });
  console.log(res)
  return res
}

export async function deletePatient(params: { user_id: string }) {
  return request('/api/doctor/call', {
    method: "POST",
    params: params,
  });
}

export async function uploadDiagnosis(diagnosis: diagnosisType) {
  console.log(diagnosis)
  return request('/api/doctor/diagnostic_msg/upload', {
    method: "POST",
    params: diagnosis,
  });
}

export async function GetDoctorId(params: {}) {
  return request("/api/me", {
    method: "GET",
    params: { ...params },
  })
}
