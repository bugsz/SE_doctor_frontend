import { request } from 'umi';
import type { patientInfoType } from './data';

export async function queryPatientInfo(params: { id: string }): Promise<{ data: patientInfoType }> {
  return request('/api/doctor/patient_info/get', {
    params,
  });
}
