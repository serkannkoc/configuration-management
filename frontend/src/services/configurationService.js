import axiosInstance from "../helpers/axiosInstance.js";

const ConfigurationService = {
    async list() {
        try {
            const response = await axiosInstance.get(`/configurations/sorted`);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    },
    async add(data) {
        try {
            const response = await axiosInstance.post(`/configurations`,data);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    },
    async update(id,data) {
        try {
            const response = await axiosInstance.put(`/configurations/${id}`,data);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    },
    async delete(id) {
        try {
            const response = await axiosInstance.delete(`/configurations/${id}`);
            if (response.data.success) {
                return response.data.data;
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            throw error;
        }
    },




};

export default ConfigurationService;
