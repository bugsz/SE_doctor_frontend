import { request } from 'umi';

export async function ListDoctor(params) {
  return request("/api/doctor/get", {
    method: "GET",
    params: { ...params },
  })
}
export async function DeleteDoctor(params) {
  return request("/api/doctor/delete", {
    method: "DELETE",
    params: {...params},
  }
  );
}
