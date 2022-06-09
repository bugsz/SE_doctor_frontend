/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser? }) {
  const { currentUser } = initialState || {};
  console.log(currentUser);
  return {
    canAdmin: currentUser && currentUser.access === 1,
    canDoctor: currentUser && currentUser.access === 2,
  };
}
