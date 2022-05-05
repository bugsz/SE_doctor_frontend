import { request } from 'umi';

export async function ListDoctorDetails(id, data, options) {
  console.log(id);
  console.log(options);
  return request("/api/doctor/details", {
    method: "GET",
    params: {id: id},
  })
};

export async function t(params) {
    return request("/api/doctor/get", {
        method: "GET",
        params: params,
    })
};