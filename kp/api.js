import axios from "axios";
import { toast } from "react-toastify";

const base_url = "http://localhost:8080";

export const loginApi = (url, data, navigate) => {
  axios.post(base_url + url, data).then(
    (response) => {
      console.log("success", response);
      sessionStorage.setItem("user", JSON.stringify(response.data[1]));
      console.log(sessionStorage.getItem("user"));
      navigate(`/home/${response.data[1].userid}`);
      // toast.success("Welcome to the Employee Database Management System!");
      toast.success(response.data[0], {
        //   position: "top-center",
      });
    },
    (error) => {
      console.log("error", error);
      toast.error(error.response.data, {
        //   position: "top-center",
      });
    }
  );
};

export const postApi = (url, data, navigate) => {
  console.log("data", data);
  console.log("url", base_url + url);
  axios.post(base_url + url, data).then(
    (response) => {
      console.log("success", response);
      navigate("/");
      // toast.success("Welcome to the Employee Database Management System!");
      toast.success(response.data, {
        //   position: "top-center",
      });
    },
    (error) => {
      console.log("error", error);
      toast.error(error.response.data, {
        //   position: "top-center",
      });
    }
  );
};

export const getApi = (url, succ, err) => {
  axios.get(base_url + url).then(
    (response) => {
      console.log("success", response);
      // toast.success("Welcome to the Employee Database Management System!");
      toast.success(response.data, {
        //   position: "top-center",
      });
    },
    (error) => {
      console.log("error", error);
      toast.error(error.response.data, {
        //   position: "top-center",
      });
    }
  );
};

export const getAllEmployees = (url, setEmployees) => {
  axios.get(base_url + url).then(
    (response) => {
      console.log("success", response);
      // sessionStorage.setItem("emp", JSON.stringify(response.data));
      setEmployees(response.data);
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

export const updateEmployee = (url, data) => {
  console.log("data", data);
  console.log("url", base_url + url);
  return axios.put(base_url + url, data).then(
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

export const deleteEmployee = (url) => {
  console.log("url", base_url + url);
  return axios.delete(base_url + url).then(
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
