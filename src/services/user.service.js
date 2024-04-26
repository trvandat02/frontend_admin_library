import createApiClient from './api.service';

class UsersService {
    constructor (baseUrl = '/api/users')  {
        this.user = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.user.get('/')).data;
    }

    async getOne(email) {
        return (await this.user.get(`/${email}`)).data;
    }

    async create(data) {
        return (await this.user.post('/', data)).data;
    }

    async update(id, data) {
        return (await this.user.post(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.user.delete(`/${id}`)).data;
    }
}

export default new UsersService();