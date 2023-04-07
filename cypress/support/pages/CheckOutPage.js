export class CheckOutPage {
    constructor() {
        this.name = "#FirstName",
        this.lastName = "lastName",
        this.cardNumber = "cardNumber",
        this.purchaseButton = "Purchase";
    };

    typeFirstName(name) {
        cy.xpath('//input[contains(@id,"FirstName")]').type(name);
    };

    typeLastName(lastName) {
        cy.xpath('//input[contains(@id,"lastName")]').type(lastName);
    };

    typecardNumber(cardNumber) {
        cy.xpath('//input[contains(@id,"cardNumber")]').type(cardNumber);
    };

    clickPurchaseButton() {
        cy.xpath('//button[text() = "Purchase"]').click();
    };
} 
