import axiosClient from "../../api/axiosClient";

export const getAllBox = (userId) => async (dispatch) => {
    try{
        dispatch({ type: "GET_BOX_REQUEST" });

        const {data} = await axiosClient.post("/messages/boxchat", userId)
       
        dispatch({ type: "GET_BOX_SUCCESS", payload: data });
    }
    catch(error){
        dispatch({
            type: "GET_BOX_FAIL",
            payload:
              error.response && error.response.data.message
                ? error.response.data.message
                : error.message,
          });
    }
}
export const createBox = (userCurrentId, userSendId) => async (dispatch) => {
    try{
        const {data} = await axiosClient.post("/messages", {senderId: userCurrentId, receiverId: userSendId})
        dispatch({ type: "CREATE_BOX_SUCCESS", payload: data });
    }
    catch(error){
        console.log(error.message);
    }
}
export const getMessage =  async (boxId) => {
    try{

        return await axiosClient.get(`/chatbox/${boxId}`)

    }
    catch(error){
        console.log(error.message);
    }
}
export const sendMessage = async (message) => {
    try{
        return await axiosClient.post('/chatbox', message)
    }
    catch(error){
        console.log(error.message);
    }
}