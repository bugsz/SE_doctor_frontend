import { request } from 'umi';
import { DoctorItem } from './data';

export async function ListDoctorDetails(id: string): Promise<{ data: DoctorItem }> {
  console.log(id);
  const doctorDetail = request('/api/doctor/details', {
    method: 'GET',
    params: { doctor_id: id },
  });

  return doctorDetail;
}

export async function AddDoctorInfo(data: DoctorItem): Promise<{ msg: string; status: Number }> {
  console.log('add');
  console.log(data);
  return request('/api/doctor/create', {
    method: 'POST',
    data: data,
  });
}

/// unused?
export async function ModifyDoctorInfo(id: string, data: any, options?: any) {
  return request('/api/doctor/modify', {
    method: 'POST',
    params: { doctor_id: id },
    data: data,
  });
}

export async function ListDoctorSchedule(id: string, time_delta = 2) {
  const doctorArrangement = request('/api/doctor/schedule', {
    method: 'GET',
    params: {
      doctor_id: id,
      time_delta: time_delta,
    },
  });

  // console.log(doctorArrangement)

  return doctorArrangement;
}

export async function ListDoctor(params: {
  name?: string;
  pageSize?: Number;
  current?: Number;
  department?: string;
}) {
  return request('/api/doctor/get', {
    method: 'GET',
    params: { ...params },
  });
}
export async function DeleteDoctor(params: { doctor_id: string }) {
  return request('/api/doctor/delete', {
    method: 'DELETE',
    params: { ...params },
  });
}
