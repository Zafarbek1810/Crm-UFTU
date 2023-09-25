import client from "../HHTP/client";

export default class FileProvider {
    static async fileUpload(userId, fileTypes, file) {
        return await client.post(`/file/upload?userId=${userId}&fileTypes=${fileTypes}`, file, { headers: { "Content-Type": "multipart/form-data" } });
    }

    static async fileDownload(hashId) {
        return await client.get(`/file/download?hashId=${hashId}`);
    }

    static async filePreview(hashId) {
        return await client.get(`/file/preview?hashId=${hashId}`, { responseType: 'blob' })
            .then((response) => {
                return response;
            }
            ).catch((err) => {
                return Promise.reject(err);
            });
    }

    static async fileGetAll(id) {
        return await client.get(`/file/get?userId=${id}`);
    }



}
