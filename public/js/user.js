class User {
    constructor() {
        const that = this;

        let user = document.getElementById('signup').innerHTML;

        const promise = new Promise((resolve, reject) => {

            const oReq = new XMLHttpRequest();

            oReq.open('POST', '/login');

            oReq.addEventListener('load', () => {
                if (oReq.status === 200 && user !== 'SignUp/SignIn') {
                    resolve(that.user = user);
                } else {
                    that.user = null;
                    resolve(user = 'SignUp/SignIn');
                }
            });
            oReq.send();

        });
        promise.then(result => domService.showUserItems(that.user));
    }
}
