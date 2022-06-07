import { request } from 'umi';
import type { diagnosisType, patientInfoType } from './data';

export async function queryPatientInfo(params: {
  id?: string;
})/*: Promise<{ data: patientInfoType }> */{
  console.log({user_id: params.id})
  return request('/api/doctor/patient_info/get', {
    params: {user_id: params.id},
  });
}

export async function deletePatient(params: { id?: string }) {
  return request('/api/doctor/call', {
    params: params,
  });
}

export async function uploadDiagnosis(diagnosis: diagnosisType) {
  return request('/api/doctor/diagnostic_msg/upload', {
    params: diagnosis,
  });
}
