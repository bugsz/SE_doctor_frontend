import { request } from 'umi';

export async function ListScheduleDetails(id, data, options) {
  console.log(id);
  console.log(options);
  return request("/api/TimeTable_Change/details", {
    method: "GET",
    params: {date: id},
  })
};

export async function t(params) {
    return request("/api/TimeTable_Change/get", {
        method: "GET",
        params: params,
    })
};