const API = {
    url: '/mock_data/data.json',
    getFinancials: async () => {
        try {
            const res = await fetch(API.url);
            return await res.json();
        } catch (error) {
            console.error('An error has occured: ', error);
        }
    },
};

export default API;
