import { request } from 'umi';
import type { apiAnnounceResultType } from './data';

export async function queryAnnounce(): Promise<{ data: apiAnnounceResultType }> {
  return request('/api/announce/get');
}
