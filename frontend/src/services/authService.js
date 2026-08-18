
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

export const ForgotpasswordServices = async (email) => {
  const response = await api.post("/forgot-password/send-otp", {
    email,
  });

  return unwrap(response);
};

export const VerifyOTPService = async (email, otp) => {
  const response = await api.post("/forgot-password/verify-otp", {
    email,
    otp,
  });

  return unwrap(response);
};

export const ResetPasswordService = async (
  resetToken,
  newPassword,
  confirmPassword
) => {
  const response = await api.post("/forgot-password/reset", {
    resetToken,
    newPassword,
    confirmPassword,
  });

  return unwrap(response);
};