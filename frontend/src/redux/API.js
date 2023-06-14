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
    "Content-Type": "application/json",

    Authorization: getAuthorizationHeader(),
  },
});

const formAPI = axios.create({
  baseURL: baseURL,
  // withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",

    Authorization: getAuthorizationHeader(),
  },
});

//Users
export const UserRegisterAPI = (data) => formAPI.post("/user/register", data);

export const UserLoginAPI = (data) => baseAPI.post("/user/login", data);

export const UserForgotPassword = (data) =>
  baseAPI.post("/user/forgotpassword", data);

export const UserResetPassword = (resetoken, data) =>
  baseAPI.post(`/user/resetpassword/${resetoken}`, data);

  export const ChangePassword = (data) =>
    AuthAPI.post("/user/changepassword", data, {
      headers: {
        Authorization: getAuthorizationHeader(),
      },
    });

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

// jobs
export const AddJobAPI = (data) =>
  AuthAPI.post("/job/create", data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const UpdateJobAPI = (id, data) =>
  AuthAPI.put(`/job/update/${id}`, data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const DeleteJobAPI = (jobId) =>
  AuthAPI.delete(`/job/delete/${jobId}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
export const GetJobByRecruiterAPI = (page) =>
  AuthAPI.get(`job/jobbyrecruiter?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });


export const GetJobByIdAPI = (id) =>
  AuthAPI.get(`job/jobbyid/${id}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetJobByFilter = ({ title, category, salary, page }) =>
  baseAPI.get(
    `job/alljob?title=${title}&category=${category}&salary=${salary}&page=${page}`
    
  );
  
export const ApplyJob = (data) =>
  formAPI.post("jobApply/apply", data, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetAppliedJobbyUser = (page) =>
  AuthAPI.get(`jobApply/byuser?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const GetJobApplicationbyRecruiter = (page) =>
  AuthAPI.get(`jobApply/byrecruiter?page=${page}`, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });

export const UpdateStatus = (id, status) =>
  AuthAPI.put(`jobApply/updatestatus/${id}`, status, {
    headers: {
      Authorization: getAuthorizationHeader(),
    },
  });
