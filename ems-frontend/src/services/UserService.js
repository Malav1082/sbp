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
      return error.response; // Ensure this returns the error response
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
      return error.response; // Ensure this returns the error response
    } else {
      console.error('API Error:', error);
      throw new Error('Network error or server is down');
    }
  }
};
  
  export const getAllEmployees = (url) => {
    axios.get(base_url + url).then(
      (response) => {
        console.log("success", response);
        sessionStorage.setItem("emp", JSON.stringify(response.data));
      },
      (error) => {
        console.log("error", error);
      }
    );
  };
  
  export const addEmployee = (url, data) => {
    console.log("data", data);
    console.log("url", base_url + url);
    return axios.post(base_url + url, data).then(
      (response) => {
        console.log("success", response);
        return response;
      },
      (error) => {
        console.log("error", error);
        return error;
      }
    );
  };
  