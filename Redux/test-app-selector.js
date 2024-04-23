const state = {
  auth: {
    isLoggedIn: false,
  },
  user: {
    userId: null,
    firstName: null,
    lastName: null,
    userName: null,
    email: null,
    passWord: null,
  },
};

export const testUseAppSelector = (f) => f(state);
