/// <reference types="cypress"/>
describe("fonctionalité d'authontification", ()=>{

    // 🧩 Le beforeEach() s'exécute avant CHAQUE test (it)
    // Donc à chaque fois : la page est rechargée et le panier est vidé.
    beforeEach("visiter le lien ", ()=>{
        cy.visit("https://www.saucedemo.com/") // ouvrir la page de login
        cy.get("#user-name").type("standard_user") // entrer le nom d'utilisateur
        cy.get("#password").type("secret_sauce") // entrer le mot de passe
        cy.get("#login-button").click() // cliquer sur le bouton login
    })


    it("ajouter produits 1 au panier", ()=>{
        // ➕ Ajout du premier produit (sac à dos)
        cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()

        // ✅ Vérifie que le bouton "Remove" apparaît (le produit est bien ajouté)
        cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible")

        // 🛒 Vérifie que le badge du panier affiche 1 produit
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1")
    })


    it("ajouter produits 2eme au panier", ()=>{

        // ⚠️ Important : le beforeEach recharge la page avant ce test.
        // Donc le panier est vide ici, on doit réajouter les produits.

        // ➕ Ajout du premier produit
        cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
        cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible")

        // ➕ Ajout du deuxième produit
        cy.get("button[data-test='add-to-cart-sauce-labs-bike-light']").click()
        cy.get("button[data-test='remove-sauce-labs-bike-light']").should("be.visible")

        // ✅ Vérifie que le badge du panier affiche maintenant 2 produits
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "2")
    })


    it("aller au paniier", ()=>{
        // ⚠️ Le panier est à nouveau vide car la page a été rechargée (beforeEach)
        // Donc on réajoute encore les deux produits avant d’aller dans le panier.

        cy.get("button[data-test='add-to-cart-sauce-labs-backpack']").click()
        cy.get("button[data-test='remove-sauce-labs-backpack']").should("be.visible")

        cy.get("button[data-test='add-to-cart-sauce-labs-bike-light']").click()
        cy.get("button[data-test='remove-sauce-labs-bike-light']").should("be.visible")

        // ✅ Vérifie que le badge affiche bien 2 produits
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "2")

        // 🛍️ Aller dans le panier
        cy.get(".shopping_cart_link").click()

        // ✅ Vérifie qu'il y a bien 2 articles dans le panier
        cy.get(".cart_item").should('have.length', 2)

        // ✅ Vérifie les noms des produits présents
        cy.get(".cart_item").should('contain', 'Sauce Labs Backpack')
        cy.get(".cart_item").should('contain', 'Sauce Labs Bike Light')

        // ➖ Supprimer le deuxième produit (bike light)
        cy.get("#remove-sauce-labs-bike-light").click()
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1") // badge = 1

        // ➖ Supprimer le premier produit (backpack)
        cy.get("#remove-sauce-labs-backpack").click()
        cy.get("span[data-test='shopping-cart-badge']").should("not.exist") // badge disparaît
    })
})
