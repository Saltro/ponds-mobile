import instance from './instance';

interface IUserInfoWithToken extends IUserInfo {
  access_token: string;
  refresh_token: string;
}

const login = (username: string, password: string) => {
  return instance.post<ResponseBody<IUserInfoWithToken>>('/api/user/login/', { username, password });
};

// eslint-disable-next-line max-params
const register = (username: string, password: string, nickname: string, phone: string, smsCode: string) => {
  return instance.post<ResponseBody<IUserInfoWithToken>>('/api/user/register/', {
    username,
    password,
    nickname,
    phone,
    smsCode,
  });
};

const getUserInfo = () => {
  return instance.get<ResponseBody<IUserInfo>>('/api/user/');
};

const user = {
  login,
  register,
  getUserInfo,
};

export default user;
