const constants = require('../constants');

export class ReceiptPage{
        constructor() {
            this.name = "#name",
            this.cardNumber = "#creditCard",
            this.totalPrice = "#totalPrice"
        };

        getName(){
            return cy.get(this.name,{timeout: constants.TIMEOUT * 1.2});
        };

        getAddedProductName(product){
            return cy.xpath(`//p[text() = '${product}']`);
           };

        getCardNumber(){
            return cy.get(this.cardNumber);
        };

        getTotal(){
            return cy.get(this.totalPrice);
        }
    } 