export const storageAPI = {
    set: (name, item) => {
        sessionStorage.setItem(name, JSON.stringify(item))
    },

    get: (name) => {
        return JSON.parse(sessionStorage.getItem(name)) 
    }
}