export class RegisterPage {
    constructor() {
        this.registerButton = "#registertoggle"
    }

    dblClickRegister() {
        cy.get(this.registerButton).dblclick();
    }
} 