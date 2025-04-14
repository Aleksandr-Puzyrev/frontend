const Routes = {
    mainPage: "/",
    auth: {
      login: "/auth/login",
      registration: "/auth/registration",
      recovery: "/auth/recovery",
    },
    courses: {
      list: "/courses",
      detail: (id: string) => `/courses/${id}`,
      create: "/create-course"
    },
    users: {
      list: "/users",
      detail: (id: string) => `/users/${id}`,
    },
    account: {
      profile: "/profile",
      settings: "/settings",
    },
    forbidden: "/forbidden",
  };
  
  export default Routes;
  