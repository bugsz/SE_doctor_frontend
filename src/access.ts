/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser? }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser && currentUser.role === 'admin',
  };
}
