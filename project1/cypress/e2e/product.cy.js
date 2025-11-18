/// <reference types="cypress"/>
describe("fonctionalité d'authontification", ()=>{

    beforeEach("visiter le lien ", ()=>{
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  ciler le button login et clicker la le faite de taper
   
})
it("ajouter produits au panier", ()=>{
        
    cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
    cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible") 
    cy.get("span[data-test='shopping-cart-badge']").should('have.length', 1)
   
})

})
