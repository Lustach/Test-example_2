// import axios from 'axios';

// export default {
//     axios:axios,
//     url:'http://localhost:3000',
//     install: function (Vue) {
//         const API = {
//             getPage:(payload) => {
//                 let hel = this.axios.get(`${this.url}/articles?_page=${payload.page}&_limit=${payload.limit}`)
//             console.log(hel,"payload")}
//         }
//         Object.defineProperty(Vue.prototype, '$api', { value: API });
//     }
// }
//clg