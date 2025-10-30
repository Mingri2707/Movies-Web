import api from "@/lib/axios";

export const authService = {
  signUp: async (
    lastName: string,
    firstName: string,
    username: string,
    email: string,
    password: string
  ) => {
    const res = await api.post(
      "/auth/signup",
      {
        lastName,
        firstName,
        username,
        email,
        password,
      },
      { withCredentials: true }
    );
    return res.data;
  },
  signIn: async (username: string, password: string) => {
    const res = await api.post(
      "/auth/signin",
      {
        username,
        password,
      },
      { withCredentials: true }
    );
    return res.data;
  },
  signOut: async () => {
    const res = await api.post("/auth/signout", {}, { withCredentials: true });
    return res.data;
  },
  fetchMe: async () => {
    const res = await api.get("/users/me", {
      withCredentials: true,
      headers: { "Cache-Control": "no-cache" },
    });
    console.log("fetchMe result:", res.data.user); // debug
    return res.data.user;
  },

  refresh: async () => {
    const res = await api.post("/auth/refresh", {}, { withCredentials: true });
    return res.data.accessToken;
  },
};
