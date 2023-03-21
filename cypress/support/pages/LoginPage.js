export class LoginPage {
   constructor () {
    this.userInput = "#user",
    this.passInput = "#pass",
    this.loginButton = "#submitForm"
   }

   enterUser(user){
    cy.get(this.userInput).type(user);
   }

   enterPass(password){
    cy.get(this.passInput).type(password);
   }

   clickLogin(){
    cy.get(this.loginButton).click();
   }
}