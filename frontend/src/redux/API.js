import axios from "axios";

const baseURL = "http://localhost:4000";

const baseAPI = axios.create({
  baseURL: baseURL,
});

export const getToken = () =>
  localStorage.getItem("token") ? localStorage.getItem("token") : null;

export const getAuthorizationHeader = () => `Bearer ${getToken()}`;

const AuthAPI = axios.create({
  baseURL: baseURL,
  headers: {
    Authorization: getAuthorizationHeader(),
  },
});

const formAPI = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

//Users
export const UserRegisterAPI = (data) => formAPI.post("/user/register", data);
export const UserLoginAPI = (data) => baseAPI.post("/user/login", data);
export const UserLogoutAPI = () =>
  AuthAPI.get("/user/logout", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

//Recruiter
export const RecruiterRegisterAPI = (data) =>
  formAPI.post("/recruiter/register", data);
export const RecruiterLoginAPI = (data) =>
  baseAPI.post("/recruiter/login", data);
export const RecruiterLogoutAPI = () =>
  AuthAPI.get("/recruiter/logout", {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
