export class HomePage {
    constructor() {
        this.shopButton = "#onlineshoplink"
    };

    clickShop() {
        cy.get(this.shopButton).click();
    };
} 