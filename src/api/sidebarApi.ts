import { GetRequest } from '@/services/httpRequest';

export const getCategoriesTypes = async () =>{
 try{
    const response = await GetRequest(`/category/types/all`);
    return response;  
 }catch(error){
     //console.log(error);
 }
}