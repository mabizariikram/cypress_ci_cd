/// <reference types="cypress"/>
describe("fonctionalité d'authontification", ()=>{

    beforeEach("visiter le lien ", ()=>{
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  ciler le button login et clicker la le faite de taper
   
})
it("ajouter produits 1  au panier", ()=>{
        
    cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
    cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible") 
  
    cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1");
   
})

it("ajouter produits 2eme au panier", ()=>{

    cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
    cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible") 
    //cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1");
   
    cy.get("button[data-test='add-to-cart-sauce-labs-bike-light']").click()
    cy.get("button[data-test='remove-sauce-labs-bike-light']").should("be.visible") 
    
    cy.get("span[data-test='shopping-cart-badge']").should("have.text", "2");
    


    })

    it("aller au paniier", ()=>{
        cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
        cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible") 
        //cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1");
       
        cy.get("button[data-test='add-to-cart-sauce-labs-bike-light']").click()
        cy.get("button[data-test='remove-sauce-labs-bike-light']").should("be.visible") 
        
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "2");



        
        
        cy.get(".shopping_cart_link").click()

        cy.get(".cart_item").should('have.length', 2)
        cy.get(".cart_item").should('contain', 'Sauce Labs Backpack')
        cy.get(".cart_item").should('contain', 'Sauce Labs Bike Light')

        cy.get("#remove-sauce-labs-bike-light").click() 
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1")

        cy.get("#remove-sauce-labs-backpack").click() 
        cy.get("span[data-test='shopping-cart-badge']").should("not.exist")


        
       
    })
    

})
