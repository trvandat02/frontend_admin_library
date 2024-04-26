import createApiClient from './api.service';

class PublishersService {
    constructor (baseUrl = '/api/publishers')  {
        this.publisher = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.publisher.get('/')).data;
    }

    async getOne(email) {
        return (await this.publisher.get(`/${email}`)).data;
    }

    async create(data) {
        return (await this.publisher.post('/', data)).data;
    }

    async update(id, data) {
        return (await this.publisher.post(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.publisher.delete(`/${id}`)).data;
    }
}

export default new PublishersService();