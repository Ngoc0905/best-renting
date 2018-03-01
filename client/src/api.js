import axios from 'axios';

const service = axios.create({
    baseURL: 'http://localhost:3000/api',
});

const errHandler = err => {
    console.error(err.response.data);
    throw err.response.data;
};

export default {
    signup(userInfo) {
        return service
            .post('/signup', userInfo)
            .then(res => res.data)
            .catch(errHandler);
    },
    login(email, password) {
        return service
            .post('/login', {
                email,
                password,
            })
            .then(res => {
                const {
                    data
                } = res; // const data = res.data
                localStorage.setItem('user', JSON.stringify(data));
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + data.token;
                return data;
            })
            .catch(errHandler);
    },

    getSecret() {
        return service
            .get('/secret')
            .then(res => res.data)
            .catch(errHandler);
    },

    logout() {
        delete axios.defaults.headers.common['Authorization'];
        localStorage.removeItem('user');
    },

    loadUser() {
        const userData = localStorage.getItem('user');
        if (!userData) return false;
        const user = JSON.parse(userData);
        if (user.token && user.name) {
            axios.defaults.headers.common['Authorization'] = 'Bearer ' + user.token;
            return user;
        }
        return false;
    },

    saveReview(review){
        return service.post('/reviews', review).catch(errHandler);
    },
    
    getReviews(place){
        return service.get('/reviews', {
            params: {
                street_number: place.street_number,
                route: place.route,
                city: place.city,
                region: place.region,
                country: place.country
            }
        });
    },

    saveAdRenting(adrenting){
        return service.post('/adrenting', review).catch(errHandler);
    },

    getAdRentings(place){
        return service.get('/adrenting', {
            params: {
                street_number: place.street_number,
                route: place.route,
                city: place.city,
                region: place.region,
                country: place.country
            }
        });
    },

    saveAdFinding(adfinding){
        return service.post('/adfinding', review).catch(errHandler);
    },

    getAdFindings(place){
        return service.get('/adfinding', {
            params: {
                street_number: place.street_number,
                route: place.route,
                city: place.city,
                region: place.region,
                country: place.country
            }
        });
    },


};