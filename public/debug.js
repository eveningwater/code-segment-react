const option = {
  theme: 'light',
};
const agent = window.navigator.userAgent;
if (/mobile/i.test(agent)) {
  const con = new window.VConsole(option);
  console.log('console:', con);
}