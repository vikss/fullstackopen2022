import axios from 'axios';
const add = (url, obj) => {


    const request = axios.post(url, obj)
    return request;
}
const getAll = (url) => {

    const request = axios.get(url)
    return request;


}

const update = (url, id, obj) => {

    const request = axios.put(`${url}/${id}`, obj);
    return request;
}
const deleteDoc = (url) => {

    const request = axios.delete(url);
    return request;

}
export { add, getAll, update, deleteDoc }