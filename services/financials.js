import API from './API.js';

export async function loadFinancials() {
    const data = await API.getFinancials();
    app.store.data = data;
}
