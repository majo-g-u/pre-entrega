/// <reference types="cypress" />

import { HomePage } from "../support/pages/HomePage";
import { ProductPage } from "../support/pages/ProductPage";
import { ShoppingCartPage } from "../support/pages/ShoppingCartPage";
import { CheckOutPage } from "../support/pages/CheckOutPage"
import { ReceiptPage } from "../support/pages/Receipt"

describe('empty spec', () => {
  // variables
  let productData;
  let checkoutData;

  // classes
  const homePage = new HomePage();
  const prodPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();
  const checkOutPage = new CheckOutPage();
  const receiptPage = new ReceiptPage();

  // input for POST request
  const username = 'majo' + Math.floor(Math.random() * 1000);
  const password = "123456!";
  const gender = "Female";
  const day = "06";
  const month = "08";
  const year = "1989";

  before('create user, login and load fixtures', () => {
    cy.fixture("fixtureCheckOut").then(data => {
      checkoutData = data;
    });
    cy.fixture("fixtureProducts").then(data => {
      productData = data;
    });
    cy.request({
      url: 'https://pushing-it.onrender.com/api/register',
      method: 'POST',
      body: {
        username: username,
        password: password,
        gender: gender,
        day: day,
        month: month,
        year: year
      }
    }).then(response => {
      cy.log(response);
      expect(response.status).equal(200);
      expect(response.body.newUser.username).equal(username);
      cy.request({
        url: 'https://pushing-it.onrender.com/api/login',
        method: 'POST',
        body: {
          username: username,
          password: password,
        },
      }).then(response => {
        expect(response.status).equal(200);
        localStorage.setItem('user', response.body.user.username);
        localStorage.setItem('token', response.body.token);
      });
    });
  });

  it('passes', () => {
    cy.visit('');
    homePage.clickShop();
    prodPage.addProductToCart(productData.products.product1.productName);
    prodPage.addProductToCart(productData.products.product2.productName);
    prodPage.clickGoToCart();
    shoppingCartPage.getAddedProductPrice(productData.products.product1.productName).should('have.text', `$${productData.products.product1.productPrice}`);
    shoppingCartPage.getAddedProductPrice(productData.products.product2.productName).should('have.text', `$${productData.products.product2.productPrice}`);
    shoppingCartPage.clickShowTotalPriceButton();
    shoppingCartPage.goToCheckoutButton();
    checkOutPage.typeFirstName(checkoutData.userName);
    checkOutPage.typeLastName(checkoutData.lastName);
    checkOutPage.typecardNumber(checkoutData.cardNumber);
    checkOutPage.clickPurchaseButton();
    receiptPage.getName().should('contain', (`${checkoutData.userName} ${checkoutData.lastName}`));
    receiptPage.getAddedProductName(productData.products.product1.productName).should('have.text', productData.products.product1.productName);
    receiptPage.getAddedProductName(productData.products.product2.productName).should('have.text', productData.products.product2.productName);
    receiptPage.getCardNumber().should('have.text', checkoutData.cardNumber);
    receiptPage.getTotal().should('contain', productData.products.product1.productPrice + productData.products.product2.productPrice);
  });

  after('user is deleted', () => {
    cy.request({
      url: `https://pushing-it.onrender.com/api/deleteuser/${username}`,
      method: 'DELETE'
    }).then(response => {
      cy.log(response);
      expect(response.status).equal(200);
    });
  });
});

//     shoppingCartPage.getTotal().should('have.text', productData.products.product1.productPrice + productData.products.product2.productPrice);

