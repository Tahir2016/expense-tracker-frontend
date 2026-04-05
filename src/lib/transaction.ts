import API from "./api";


export const getTransactions= async () =>{
    
    const res = await API.get("/tracker/all");
    return res.data;
}