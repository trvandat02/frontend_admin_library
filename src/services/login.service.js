import createApiClient from './api.service';

class LogService {
    constructor (baseUrl = '/api/log/user')  {
        this.user = createApiClient(baseUrl);
    }

    async get() {
        return (await this.user.get(`/token`)).data;
    }

    
}

export default new LogService();