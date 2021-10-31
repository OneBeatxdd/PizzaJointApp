import ActionType from '../types/actionType';

export const login = (token) => ({ type: ActionType.LOGIN, payload: { token } });
export const logout = () => ({ type: ActionType.LOGOUT });
