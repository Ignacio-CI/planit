const state = {
    totalIncome: 0,
    totalExpenses: 0,
    totalInvestments: 0,
    transactions: [
        {
            id: '',
            description: '',
            category: '',
            amount: 0,
            date: '',
        },
    ],
    expensesDetails: {
        housing: 0,
        food: 0,
        transportation: 0,
        utilities: 0,
        entertainment: 0,
        other: 0,
    },
    incomeDetails: {
        salary: 0,
        freelancing: 0,
        investments: 0,
        other: 0,
    },
    investmentsDetails: {
        stocks: 0,
        crypto: 0,
        bonds: 0,
        savings: 0,
        realEstate: 0,
        other: 0,
    },
}

const listeners = new Set()

const store = new Proxy(state, {
    set(target, property, value) {
        target[property] = value
        notifyListeners(property, value)
        return true
    },
})

function notifyListeners(property, value) {
    listeners.forEach(listener => listener(property, value))
}

function subscribe(listener) {
    listeners.add(listener)
    return () => listeners.delete(listener)
}

subscribe((property, value) => {
    console.log(`Property ${property} updated to: `, value)
})

export { store, subscribe }
