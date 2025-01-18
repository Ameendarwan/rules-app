import Cookies from 'js-cookie';

const auth = {
  token: () => Cookies.get('token'),
  saveToken: (token: string) => {
    Cookies.set('token', token);
  },
  clearToken: () => {
    Cookies.remove('token');
  },
};

export default auth;
