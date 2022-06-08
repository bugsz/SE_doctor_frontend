import { request } from 'umi';

export async function ListDoctorDetails(id, data, options) {
  console.log(id);
  console.log(options);
  const doctorDetail = request("/api/doctor/details", {
    method: "GET",
    params: {doctor_id: id},
  })

  return doctorDetail
};

export async function ListDoctorSchedule(id, time_delta=2) {
  const doctorArrangement = request("/api/doctor/schedule", {
    method: "GET",
    params: {
      doctor_id: id,
      time_delta: time_delta  
    }
  })

  // console.log(doctorArrangement)

  return doctorArrangement
}