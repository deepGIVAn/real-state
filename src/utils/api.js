import axios from "axios";
// import dayjs from "dayjs";
import { toast } from "react-toastify";
import dayjs from "dayjs";

const apiBaseURL = import.meta.env.VITE_APP_API;

export const api = axios.create({
  baseURL: apiBaseURL,
});

export const getAllProperties = async () => {
  try {
    const response = await api.get("/api/residency/getall", {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const getProperty = async (id) => {
  try {
    const response = await api.get(`/api/residency/${id}`, {
      timeout: 10 * 1000,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong");
    throw error;
  }
};

export const createUser = async (email) => {
  try {
    await api.post(
      `/api/user/register`,
      { email }
      // {
      //   headers: {
      //     Authorization: `Bearer ${token}`,
      //   },
      // }
    );
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const bookVisit = async (value, propertyId, email) => {
  try {
    await api.post(`/api/user/bookvisit/${propertyId}`, {
      email,
      date: dayjs(value).format("DD/MM/YYYY"),
    });
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const getallBookings = async (email) => {
  try {
    const response = await api.post(`/api/user/allbookings`, {
      email,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
  } catch (error) {
    toast.error("Something went wrong, Please try again");
    throw error;
  }
};

export const removeBooking = async (id, email) => {
  try {
    // console.log(id);
    // console.log(email);
    await api.post(`/api/user/removebooking/${id}`, {
      email,
    });
  } catch (error) {
    toast.error("Something went wrong, while removing..");
    throw error;
  }
};

export const toFav = async(id,email) => {
  try {
    await api.post(`/api/user/tofav/${id}`,{
      email
    });
  } catch (error) {
    toast.error("Something went wrong..");
    throw error;    
  }
};

export const getallfav = async(email) => {
  try {
    const response = await api.post(`/api/user/allfav`, {
      email,
    });
    if (response.status === 400 || response.status === 500) {
      throw response.data;
    }
    return response.data;
    // return response.data["favResidenciesID"];
  } catch (error) {
    toast.error("Something went wrong");
    throw error;        
  }
}

export const createResidency = async(data)=>{
  // console.log(data,"api");
  try {
    await api.post(`/api/residency/create`,{data});
  } catch (error) {
    toast.error("Something went wrong, while creating residency here..");
    throw error;        
  }
}