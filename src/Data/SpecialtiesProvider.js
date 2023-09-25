import client from "../HHTP/client";

export default class SpecialtiesProvider {
    static async createSpecial (body){
        return await client.post("/crm/specialties/register", body);
    }
    
    static async updateSpecial (body){
        return await client.put("/crm/specialties/update", body);
    }
    
    static async getAllSpecial() {
        return await client.get(`/crm/specialties/getAll`);
    }

}
