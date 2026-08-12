import { data } from "react-router-dom";
import api from "./api";

const unwrap = (response) => response.data;

async function registerservice(data) {

   try {

      const response = await api.post('/user-register', data);

      return unwrap(response);

   } catch (error) {

      throw error.response.data;

   }

}

export { registerservice };

 export const  loginservices = async (data)=>{

   console.log(data,'Login Form Data found Succesfully');
   
   
   const response =await  api.post('/user-login',data)

   console.log(response);
   

   return response?.data
}

export const getCurrentUser = async (data )=>{
   const response = await api.get('/getCurrentUser',data)

   return unwrap(response)
}

export const LogOut = async (data) =>{
   const response = await api.post('/logout')
   
   return unwrap(response)
}