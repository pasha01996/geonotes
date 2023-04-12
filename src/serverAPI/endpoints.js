export class Endpoints {
    constructor() {
        this.test = '/test'
    }
    
    userByEmailAndLogin(email, password) {
        return this.test + `?where=email%20%3D%20'${email}'%20AND%20password%20%3D%20'${password}'`
    }

    userId(id) {
        return this.test + `/${id}`
    }

}

