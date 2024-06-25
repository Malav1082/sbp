import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:8080";

const axiosInstance = axios.create({
  baseURL: base_url,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${sessionStorage.getItem('token')}`
  }
});

// Add Axios request interceptor to set Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // const user = JSON.parse(sessionStorage.getItem("user"));
    const token = sessionStorage.getItem("token");
    // console.log("token",token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      // console.log("token1",token);
    }
    return config;
  },
  (error) => {
    console.log("error");
    return Promise.reject("error",error);
  }
);

// POST request handler
export const postApi = async (url, data, succ, err) => {
  try {
    console.log("data",data);
    const response = await axiosInstance.post(base_url + url, data);
    toast.success(succ, { position: "top-center" });
    return response;
  } catch (error) {
    toast.error(err, { position: "top-center" });
    if (error.response) {
      return error.response;
    } else {
      console.error('API Error:', error);
      throw new Error('Network error or server is down');
    }
  }
};

// // GET request handler
// export const getApi = async (url, succ, err) => {
//   try {
//     const response = await axios.get(base_url + url);
//     toast.success(succ, { position: "top-center" });
//     return response;
//   } catch (error) {
//     toast.error(err, { position: "top-center" });
//     if (error.response) {
//       return error.response;
//     } else {
//       console.error('API Error:', error);
//       throw new Error('Network error or server is down');
//     }
//   }
// };

// PUT request handler
export const putApi = async (url, data, succ, err) => {
  try {
    const response = await axiosInstance.put(base_url + url, data);
    toast.success(succ, { position: "top-center" });
    return response;
  } catch (error) {
    console.log("error",error);
    toast.error(err, { position: "top-center" });
    if (error.response) {
      return error.response;
    } else {
      console.error('API Error:', error);
      throw new Error('Network error or server is down');
    }
  }
};

export const getEmployees = async (page = 0, size = 10) => {
  try {
      const response = await axiosInstance.get(base_url + "/home", {
          params: { page, size }
      });
    
      console.log("response",response)
      return response.data;
  } catch (error) {
      // console.error('Error fetching employees:', error);
      // const token = sessionStorage.getItem("token");
      console.log("token",token);
      throw error;
  }
};

// Add a new employee
export const addEmployee = async (data) => {
  try {
    console.log("Sending data to server:", data);
    const response = await axiosInstance.post(base_url + "/home/add", data);
    toast.success("Employee added successfully!", { position: "top-center" });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Error adding employee:", error);
    }
    toast.error("Error adding employee!", { position: "top-center" });
    throw error;
  }
};

// Delete an employee
export const deleteEmployee = async (empId) => {
  try {
    const response = await axiosInstance.delete(`${base_url}/home/delete/${empId}`);
    toast.success("Employee deleted successfully!", { position: "top-center" });
    return response.data;
  } catch (error) {
    console.error("Error deleting employee:", error);
    toast.error("Error deleting employee!", { position: "top-center" });
    throw error;
  }
};

// Update an existing employee
export const updateEmployee = async (empId, data) => {
  try {
    console.log("data", data);
    const response = await axiosInstance.put(`${base_url}/home/update/${empId}`, data);
    toast.success("Employee updated successfully!", { position: "top-center" });
    return response; // Return the full response object
  } catch (error) {
    toast.error("Error updating employee!", { position: "top-center" });
    if (error.response) {
      console.error("Error response data:", error.response.data);
    } else {
      console.error("Error updating employee:", error);
    }
    throw error;
  }
};