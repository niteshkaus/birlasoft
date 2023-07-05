import Response from "../models/response";
import axios from "axios";


export default class BaseService {
    private static baseURL: string = "http://localhost:3001/api";


    public static async getAll<T>(url: string): Promise<Response> {
        let res = await axios.get<Array<T>>(this.baseURL + url)
            .then((response: any) => {
                const result = response.data;
                if(result && result.STATUS === "SUCCESS"){
                    return new Response(true, result.DATA  as Array<T>, "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
              
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }

    public static create<T>(url: string, obj: T): Promise<Response> {

        let res = axios.post(this.baseURL + url ,obj)
            .then(response => {
                console.log('response:', response)
                const result = response.data;
                if(result && result.STATUS === "SUCCESS"){
                    return new Response(true, result.data , "Success", "");
                }else{
                    const msg = (result.messageList && result.messageList.length > 0) ? result.messageList[0].text: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    
}