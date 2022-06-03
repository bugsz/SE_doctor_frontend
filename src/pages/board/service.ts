import { request } from 'umi';
import type { apiAnnounceResultType } from './data';

export async function queryAnnounce(): Promise<{ data: apiAnnounceResultType }> {
  return request('/api/announce/get');
}

/** 获取当前的用户 GET /api/me */
export async function getCurrent(options?: { [key: string]: any }) {
  return request<{
    data: API.CurrentUser;
  }>('/api/me', {
    method: 'GET',
    ...(options || {}),
  });
}