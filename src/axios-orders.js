import axios from 'axios';

const instance= axios.create({
    baseURL: 'https://react-burger-app-28296-default-rtdb.firebaseio.com/'
})

export default instance;