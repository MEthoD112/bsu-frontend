class User {
    constructor() {
    	this.user = 'Vasya Pupkin';

    	this.loginWindow = document.getElementById('login');
    	
    	this.buttonSignIn = document.getElementById('signbutton');
		this.buttonSignIn.addEventListener('click', () => {

	    	const inputname = document.getElementById('sign');
		    this.user = inputname.value;
		    domService.showUserItems(this.user);
		    this.loginWindow.style.display = 'none';
		});

		this.buttonSignOut = document.getElementById('signoutbutton');
		this.buttonSignOut.addEventListener("click", () => {

		    this.user = null;
		    domService.showUserItems(this.user);
		    this.loginWindow.style.display = 'none';
		});

		this.loginWindow = document.getElementById('login');

		this.buttonSignUp = document.getElementById('signup');
		this.buttonSignUp.addEventListener('click', () => {
			this.loginWindow.style.display = 'block';
		});

		this.buttonClose = document.getElementById('close');
		this.buttonClose.addEventListener('click', () => {
			this.loginWindow.style.display = 'none';
		});
	}
}