class Database {
    constructor(dbName, storeName) {
        this.dbName = dbName
        this.storeName = storeName
        this.db = null
    }

    async init() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open(this.dbName, 1)

            request.onupgradeneeded = event => {
                this.db = event.target.result
                if (!this.db.objectStoreNames.contains(this.storeName)) {
                    this.db.createObjectStore(this.storeName, {
                        keyPath: 'id',
                        autoIncrement: true,
                    })
                }
            }

            request.onsuccess = event => {
                console.log(
                    '%cIndexedDB initialized successfully!',
                    'color: #8338ec; font-weight: bold'
                )
                this.db = event.target.result
                resolve(this)
            }

            request.onerror = event => {
                reject(`Database error: ${event.target.error?.message}`)
            }
        })
    }

    async getAll() {
        return new Promise((resolve, reject) => {
            console.log(
                '%cFetching data from IndexedDB',
                'color: #8338ec; font-weight: bold'
            )
            const transaction = this.db.transaction(
                [this.storeName],
                'readonly'
            )
            const store = transaction.objectStore(this.storeName)
            const request = store.getAll()

            request.onsuccess = () => resolve(request.result)
            request.onerror = event =>
                reject(`GetAll error: ${event.target.error?.message}`)
        })
    }

    async save(data) {
        return new Promise((resolve, reject) => {
            console.log(
                '%cSaving data into IndexedDB',
                'color: #8338ec; font-weight: bold'
            )
            const transaction = this.db.transaction(
                [this.storeName],
                'readwrite'
            )
            const store = transaction.objectStore(this.storeName)
            const request = store.put(data)

            request.onsuccess = () => resolve(request.result)
            request.onerror = event =>
                reject(`GetAll error: ${event.target.error?.message}`)
        })
    }
}

export const db = new Database('PlanItDB', 'state')
