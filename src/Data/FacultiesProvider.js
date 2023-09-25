import client from "../HHTP/client";

export default class FacultiesProvider {
    static async createFaculty (body){
        return await client.post("/crm/faculties/register", body);
    }
    
    static async updateFaculty (body){
        return await client.put("/crm/faculties/update", body);
    }
    
    static async getAllFaculty() {
        return await client.get(`/crm/faculties/getAll`);
    }

}
