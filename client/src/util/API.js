import axios from "axios";

export default {
    search: function (query) {
        return axios.post('/api/search', { searchContent: query })

    },
    addNew: function (info) {
        return axios.post('/api/addNew', { newItemInfo: info })

            .then(res => { console.log(res) })
            .catch(error => { console.log(error) })
    }
    
}

