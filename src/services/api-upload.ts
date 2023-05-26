import { BASE_URL } from "assets/url"
import { axiosInstance } from "context/ContextAxios"

export const url_file = async (document_id: any, file_uuid: string, file_name: string) => {

        return axiosInstance.post(`${BASE_URL}/api/storage/file/url`, {
                bucket_name: document_id,
                file_uuid: file_uuid,
                file_name: file_name,
        })
                .then(response => {
                        return response
                })
                .catch(e => {
                        console.error('ERROR FILE MINIO: ', e)
                        throw new Error()
                })
}