import api from './api';

 const unwrap = (response) => response.data


 const addToCart = async (data) => {
    try {
        const response = await api.post('/addToCart',data)
        return unwrap(response)
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}


export {addToCart}

const getCart =  async()=>{
    try {

        const resposne  =  await api.get('/getCartdata');

        return unwrap(resposne)
        
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export {getCart}


export async function removeCartItem(productId) {
    try {

        const response = await api.delete(`/removecartItem/${productId}`);

        return unwrap(response)
        
    } catch (error) {
        console.log(error);
        
    }
}



export async function updateCartQuantity(productId, action) {
  try {
    const response = await api.patch(`/quantity/${productId}`, {
      action,
    });

    return unwrap(response);
  } catch (error) {
    console.log(error);
  }
}