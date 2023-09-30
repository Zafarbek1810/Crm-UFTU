import client from "../HHTP/client";

export default class StudentProvider {
    static async createStudents(body) {
        return await client.post("/crm/student/register", body);
    }

    static async updateStudent(body) {
        return await client.put("/crm/student/update", body);
    }

    static async getAllStudent() {
        return await client.get(`/crm/student/getAll`);
    }

    static async getOneStudent(id) {
        return await client.get(`/crm/student/getOne?id=${id}`);
    }

    static async deleteStudent(id) {
        return await client.delete(`/crm/student/delete?id=${id}`);
    }

    static async fileDownload(userId, type, isCyrillic) {
        return await client.post(`/crm/student/get-pdf?userId=${userId}&type=${type}&isCyrillic=${isCyrillic}`,
            {
                headers: { 'Content-Type': 'application/pdf' }
            }, { responseType: 'blob' })
            .then((response) => {
                return response;
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }

    static async getMemo(studentId,  isCyrillic) {
        return await client.post(`/crm/student/get-memo/${studentId}?studentId=${studentId}&isCyrillic=${isCyrillic}`,
            {
                headers: { 'Content-Type': 'application/pdf' }
            }, { responseType: 'blob' })
            .then((response) => {
                return response;
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }


    static async addMemo(studentId, body) {
        return await client.post(`/crm/student/add-memo/${studentId}`, body);
    }


}
