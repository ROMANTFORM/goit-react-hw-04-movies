import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    params: {
        api_key: '2f914b341fe5d8616a45b71c9d9cbdee'
    }
});

export default instance;