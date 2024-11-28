const API = {
    url: '/mock_data/data.json',
    getFinancials: async () => {
        try {
            // const res = await fetch(API.url);
            // return await res.json();
            return JSON.parse(localStorage.getItem('financialData'));
        } catch (error) {
            console.error('An error has occured: ', error);
        }
    },
};

export default API;
