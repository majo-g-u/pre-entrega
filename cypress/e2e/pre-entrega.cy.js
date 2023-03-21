/// <reference types="cypress" />

import { RegisterPage } from "../support/pages/RegisterPage";
import { LoginPage } from "../support/pages/LoginPage";
import { HomePage } from "../support/pages/HomePage";
import { ProductPage } from "../support/pages/ProductPage";
import { ShoppingCartPage } from "../support/pages/ShoppingCartPage";

describe('empty spec', () => {
  let productData;
  let loginData;
  const registerPage = new RegisterPage();
  const loginPage = new LoginPage();
  const homePage = new HomePage();
  const prodPage = new ProductPage();
  const shoppingCartPage = new ShoppingCartPage();

  before('Before', () => {
    cy.fixture("fixtureData").then(data => {
      loginData = data;
    });
    cy.fixture("fixtureProducts").then(data => {
      productData = data;
    });
  });

  it('passes', () => {
    cy.visit('');
    registerPage.dblClickRegister();
    loginPage.enterUser(loginData.test1.user);
    loginPage.enterPass(loginData.test1.pass);
    loginPage.clickLogin();
    homePage.clickShop();
    prodPage.addProductToCart(productData.products.product1.productName);
    prodPage.addProductToCart(productData.products.product2.productName);
    prodPage.clickGoToCart();
    shoppingCartPage.getAddedProductName(productData.products.product1.productName).should('have.text', productData.products.product1.productName);
    shoppingCartPage.getAddedProductName(productData.products.product2.productName).should('have.text', productData.products.product2.productName);
    shoppingCartPage.getAddedProductPrice(productData.products.product1.productName).should('have.text', `$${productData.products.product1.productPrice}`);
    shoppingCartPage.getAddedProductPrice(productData.products.product2.productName).should('have.text', `$${productData.products.product2.productPrice}`);
    shoppingCartPage.clickShowTotalPriceButton();
    shoppingCartPage.getTotal().should('have.text', productData.products.product1.productPrice + productData.products.product2.productPrice );
  });
});