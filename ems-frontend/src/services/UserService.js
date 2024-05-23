import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:8080";

export const postApi = async (url, data, succ, err) => {
  try {
    const response = await axios.post(base_url + url, data);
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

export const getApi = async (url, succ, err) => {
  try {
    const response = await axios.get(base_url + url);
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

export const getEmployees = async (data) => {
  try {
    const response = await axios.get(base_url + "/home",data);
    // toast.success("Employees fetched successfully!", { position: "top-center" });
    return response.data;
  } catch (error) {
    // toast.error("Error fetching employees!", { position: "top-center" });
    throw error;
  }
};

export const addEmployee = async (data) => {
  try {
    console.log("Sending data to server:", data); // Log data being sent
    const response = await axios.post(base_url + "/home/add", data);
    // toast.success("Employee added successfully!", { position: "top-center" });
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error response data:", error.response.data); // Log error response from server
    } else {
      console.error("Error adding employee:", error); // Log general error
    }
    // toast.error("Error adding employee!", { position: "top-center" });
    throw error;
  }
};

export const deleteEmployee = async (empId) => {
  try {
    const response = await axios.delete(`${base_url}/home/delete/${empId}`);
    toast.success("Employee deleted successfully!", { position: "top-center" });
    return response.data;
  } catch (error) {
    console.log("Error deleting employee:", error);
    toast.error("Error deleting employee!", { position: "top-center" });
    throw error;
  }
};

export const updateEmployee = async (empId, data) => {
  try {
    console.log("data",data);
    const response = await axios.put(`${base_url}/home/update/${empId}`, data);
    toast.success("Employee updated successfully!", { position: "top-center" });
    return response.data;
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
