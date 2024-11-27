const state = {
    data: [],
};

const Store = new Proxy(state, {
    get: function (target, property) {
        console.log(`Getting property ${property}`);
        return target[property];
    },
    set: function (target, property, value) {
        console.log(`Setting property ${property} to ${value}`);
        target[property] = value;
        window.dispatchEvent(new CustomEvent('datachange'));
        return true;
    },
});

export default Store;
