import { request } from 'umi';
import type { diagnosisType, patientInfoType } from './data';

export async function queryPatientInfo(params: {
  id?: string;
}): Promise<{ data: patientInfoType }> {
  return request('/api/doctor/patient_info/get', {
    params: params,
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
