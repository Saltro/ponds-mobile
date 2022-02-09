export type Action =
  | { type: 'username'; value: string }
  | { type: 'nickname'; value: string }
  | { type: 'mobile'; value: string }
  | { type: 'avatar'; value: string }
  | { type: 'init'; value: IUserInfo };

export const initState = {
  id: 0,
  username: '',
  nickname: '',
  avatar: '',
  mobile: '',
  register_date: '',
};

export const init = (state: IUserInfo) => {
  return state;
};

export const editReducer = (state: IUserInfo, action: Action) => {
  switch (action.type) {
    case 'username':
      return {
        ...state,
        username: action.value,
      };
    case 'nickname':
      return {
        ...state,
        nickname: action.value,
      };
    case 'mobile':
      return {
        ...state,
        mobile: action.value,
      };
    case 'avatar':
      return {
        ...state,
        avatar: action.value,
      };

    case 'init':
      return init(action.value);

    default:
      return state;
  }
};
