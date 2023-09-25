import client from "../HHTP/client";

export default class UniversityProvider {
    static async createUniversity (body){
        return await client.post("/crm/univercity/register", body);
    }
    
    static async updateUniversity (body){
        return await client.put("/crm/univercity/update", body);
    }
    
    static async getAllAUniversity() {
        return await client.get(`/crm/univercity/getAll`);
    }

}
