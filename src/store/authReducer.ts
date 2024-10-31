const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

export const authReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, isAuthenticated: true };
    case LOGOUT:
      return { ...state, isAuthenticated: false };
    default:
      return state;
  }
};

export const loginAction = () => ({ type: LOGIN });
export const logoutAction = () => ({ type: LOGOUT });
export default authReducer;