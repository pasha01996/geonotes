const BASE_URL = 'https://eu-api.backendless.com/E746816B-EDF5-D528-FFBC-7AB157344F00/BC4E0A22-E3E4-4A57-921C-8615BCF9B678/data'

export const serverAPI = {
    get: async (endpoint) => {
        const url = `${BASE_URL}`+`${endpoint}`
        const res = await fetch(url).then((response) => response.json())
        return res
    },
    
    post: async (endpoint, data) => {
        const url = `${BASE_URL}`+`${endpoint}`
        return await fetch(url, {
           method: "POST",
           headers: { 'Content-Type': 'application/json' },
           body: JSON.stringify(data),
           mode: 'cors',
           cache: 'default'
       })
    },
    put: async (endpoint, data) => {
        const url = `${BASE_URL}`+`${endpoint}`
        return await fetch(url, {
            method: "PUT",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            mode: 'cors',
            cache: 'default'
        })
    }
}   