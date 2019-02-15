import axios from "axios";

export default {
    search: function (query) {
        console.log("inside API" + query)
        return axios.post('/api/search', { searchContent: query })

    },
    addNew: function (info) {
        return axios.post('/api/addNew', { newItemInfo: info })
    },
    test: function() {
        axios.post('/api/savedList/test', {
            // email:'testuser@gmail.com',
            // name:'Pokemon Gen 8', 
            // genre:'RPG', 
            // company: 'Game Freak',
            // releaseDate: '10/01/2019',
            // isReleased: false,
            // cover: 'somecover.jpg'
            email:'testuser@gmail.com',
            name:'Kingdom Hearts IV', 
            genre:'RPG', 
            company: 'Square Enix',
            releaseDate: '01/20/2027',
            isReleased: false,
            cover: 'kh4.jpg' 
        })
        .then(res => console.log(res))
        .catch(err => console.log(err))
    },
    populate: function() {
        axios.post('/api/savedList/populate', { email: 'testuser@gmail.com'})
    }

}
