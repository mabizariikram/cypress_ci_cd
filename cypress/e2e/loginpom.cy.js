/// <reference types="cypress"/>





//import LoginPage from '../pages/login.page.js'
import LoginPage from '../../pages/login.page.js'






describe("authontification avec POM", ()=>{

    beforeEach("aller a la paged'accueil ", ()=>{
        cy.visit("https://www.saucedemo.com/")
    })

    it("login with valid credentials",()=>{
        LoginPage.saisirUsername("standard_user")
        LoginPage.saisirPassword("secret_sauce")
        LoginPage.se_connecter()
        cy.url().should("include",'/inventory')
    })
    it("login with wrong credentials",()=>{
        LoginPage.saisirUsername("wrong_user")
        LoginPage.saisirPassword("wrong_user")
        LoginPage.se_connecter()
        LoginPage.getErrorMsg().should("be.visible")

    })


})