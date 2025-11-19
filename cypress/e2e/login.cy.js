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

    it("login with valid credentials",{tags:'@regression'},()=>{

        
        cy.get("#user-name").type("standard_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  ciler le button login et clicker la le faite de taper
        //cy.get("span.title").should("be.visible")//le titre va etre visible que du vrai je suis dans la page chercher 
       // cy.url().eq("https://www.saucedemo.com/inventory.html")// ca le lien de la page
       //cy.url().should("eq","https://www.saucedemo.com/inventory.html")
       cy.url().should("include", "/inventory.html")

    })

    it("login with invalid credentials",{tags: ['@regression','@smoke']}, ()=>{
        
        cy.get("#user-name").type("wrong_user")//taper le username pour acceder
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click()//  cibler le button login et clicker la le faite de taper
        
       //cy.get("svg[data-icon='times-circle']").should("be.visible")
       
       cy.get("h3[data-test=error]").should("be.visible")

    })
    it("login with fixture credentials", {tags: ['@fixture','@smoke']}, ()=>{
        cy.fixture("jdd_json_list").then((obj)=>{
            console.log(obj)
            obj.user.forEach(u => {
                
            
            cy.visit("https://www.saucedemo.com/")
            cy.get("#user-name").type(u.name)//taper le username pour acceder
            cy.get("#password").type(u.pass)
            cy.get("#login-button").click()//  cibler le button login et clicker la le faite de taper
            if(u.resultat=="ok")
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
    it("login with simple fixture",{tags: '@regression'},()=>{
        cy.fixture('jdd_json').then((compte)=>{
            cy.get("#user-name").type(compte.name)
            cy.get("#password").type(compte.pass)
            cy.get("#login-button").click()
            if(compte.resultat=="ok")
                cy.get("span.title").should("be.visible")
            else
            cy.get("h3[data-test=error]").should("be.visible")

        })
    })

    // it("test basic sur l'application",{tags:'@smoke'},()=>{
    //     cy.get("div.login_logo").should("be.visible")
    // })


})

