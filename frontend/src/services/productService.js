import api from "./api";

const unwrap =(response) => response?.data 

const ProductAdd  = async (data)=>{

    try {

        const response = await api.post('/addproduct',data,{
            headers:{
                "Content-Type":"multipart/from-data"
            }
        });

        return unwrap(response)
        
    } catch (error) {
        
        console.log(error);
   
        process.exit(1)
        
    }
}

export {ProductAdd}



export const getProductData = async () => {
  try {
    const response = await api.get("/getProducts");
    return response;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    throw error;
  }
};

export async function getBestSellerProducts() {
  const response = await api.get("/best-sellers");
  return response.data;
}