import axiosInstance from "./axiosInstance";

export const taskService = {
    getAllTask: async () =>{
        try{
            const response = await axiosInstance.get('/task');
            return response;
        }catch(error){
            throw new Error(error);
        }
    },
    createTask: async (data) =>{
        try{
            const response = await axiosInstance.post('/task', data);
            return response;
        }catch(error){
            throw new Error(error);
        }
    },
    updateTask: async (id, body) =>{
        try{
            const response = await axiosInstance.put(`/task/${id}`, body);
            console.log(response);
            return response;
        }catch(error){
            throw new Error(error);
        }
    },
    deleteTask : async (id) =>{
        try{
            const response = await axiosInstance.delete(`/task/${id}`);
            return response;
        }catch(error){
            throw new Error(error);
        }
    }

}