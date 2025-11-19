/// <reference types="cypress"/>



describe("fonctionalité d'authontification", ()=>{

    beforeEach("visiter le lien ", ()=>{
        
        let environment=Cypress.env("var")
        let url;
        switch(environment)
        {
            case("recette"):
            
                url="https://www.saucedemo.com/"
                break;
            
            case("integration"):
            
                url="https://www.saucedemo1.com/"
                break;
            
            case("preprod"):
            
               url="https://www.saucedemo2.com/"
                break;
            
            case("prod"):
            
                url="https://www.saucedemo3.com/"
                break;
            default:
                break;
            
            
        }
        cy.visit("https://www.saucedemo.com/")
       

 
})

    it("login with valid credentials",()=>{

        
        cy.get("#user-name").type("standard_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  ciler le button login et clicker la le faite de taper
        //cy.get("span.title").should("be.visible")//le titre va etre visible que du vrai je suis dans la page chercher 
       // cy.url().eq("https://www.saucedemo.com/inventory.html")// ca le lien de la page
       //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
       cy.url().should("include", "/inventory.html")

    })

    it("login with invalid credentials", ()=>{
        
        cy.get("#user-name").type("wrong_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  cibler le button login et clicker la le faite de taper
        
       //cy.get("svg[data-icon='times-circle']").should("be.visible")
       
       cy.get("h3[data-test=error]").should("be.visible")

    })
    it("login with fixture credentials", ()=>{
        cy.fixture("jdd_json").then((obj)=>{
            console.log(obj)
            
                
            
            cy.visit("https://www.saucedemo.com/")
            cy.get("#user-name").type(obj.name)//taper le username pour acceder
            cy.get("#password").type(obj.pass)
            cy.get("#login-button").click()//  cibler le button login et clicker la le faite de taper
            if(obj.resultat=="ok")
            {
                cy.get("span.title").should("be.visible")
                cy.url().should("eq","https://www.saucedemo.com/inventory.html")
            }
            else
            {
                cy.get("svg[data-icon='times-circle']").should("be.visible")
       
                cy.get("h3[data-test=error]").should("be.visible")
            }
      
         


        })
        
       

    })


})

