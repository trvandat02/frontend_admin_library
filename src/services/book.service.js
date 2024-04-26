import createApiClient from './api.service';

class BooksService {
    constructor (baseUrl = '/api/books')  {
        this.book = createApiClient(baseUrl);
    }

    async getAll() {
        return (await this.book.get('/')).data;
    }

    async getOne(email) {
        return (await this.book.get(`/${email}`)).data;
    }

    async create(data) {
        return (await this.book.post('/', data)).data;
    }

    async update(id, data) {
        return (await this.book.post(`/${id}`, data)).data;
    }

    async delete(id) {
        return (await this.book.delete(`/${id}`)).data;
    }
}

export default new BooksService();