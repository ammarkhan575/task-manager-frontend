import axiosInstance from "./axiosInstance";

export const authService = {
    signup: async (userData) =>{
        try{
            const response = await axiosInstance.post('/auth/register',userData);
            return response;
        }catch(error){
            throw new Error(error);
        }
    },
    login: async (userData) =>{
        try{
            const response = await axiosInstance.post('/auth/login',userData);
            return response;
        }catch(error){
            throw new Error(error);
        }
    }
}