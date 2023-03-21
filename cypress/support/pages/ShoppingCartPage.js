export class ShoppingCartPage {
    constructor() {
        this.showTtotalPriceButton = "Show total price",
        this.price = "#price"
    };

   getAddedProductName(product){
    return cy.xpath(`//p[text() = '${product}']`);
   };

   getAddedProductPrice(product){
    return cy.xpath(`//p[text() = '${product}']//following-sibling::p[@id= "productPrice"]`);
   };

   clickShowTotalPriceButton(){
    cy.contains(this.showTtotalPriceButton).click();
   };

   getTotal(){
    return cy.get(this.price).children();
   }
}