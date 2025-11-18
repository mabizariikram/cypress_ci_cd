/// <reference types="cypress" />

describe("fonctionnalité d'authentification", ()=> {

    beforeEach("visiter le lien", () =>{
        cy.visit("https://www.saucedemo.com/")
        cy.get("#user-name").type("standard_user")
        cy.get("#password").type("secret_sauce")
        cy.get("#login-button").click() 
    })
    
    it("Ajout de produits au panier (dynamique)", ()=>{

        // 🔹 On va créer un objet pour stocker les infos de produit
        let produit1 = { nom: "", prix: "" };
        let produit2 = { nom: "", prix: "" };

        // === 🔸 Sélection du 1er produit (index 4)
        cy.get(".inventory_item").eq(4).within(() => {
            cy.contains("Add to cart").click();
            cy.contains("Remove").should("be.visible");
            // Récupération du nom
            cy.get('.inventory_item_name').invoke('text').then((nom) => {
                produit1.nom = nom.trim();
                cy.log("Nom du produit 1 : " + produit1.nom);
            });
            // Récupération du prix
            cy.get('.inventory_item_price').invoke('text').then((prix) => {
                produit1.prix = prix.trim();
                cy.log("Prix du produit 1 : " + produit1.prix);
            });
        });

        // 🔹 Vérifier le panier a 1 produit
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "1");

        // === 🔸 Aller dans le panier et vérifier que c'est le bon produit
        cy.get("a[data-test='shopping-cart-link']").click();

        cy.get(".cart_item").should("have.length", 1);

        cy.get(".inventory_item_name").invoke('text').then((nomPanier) => {
            cy.log("Produit affiché dans le panier : " + nomPanier.trim());
            if (nomPanier.trim() === produit1.nom) {
                cy.log("✅ Le produit 1 est correct");
            } else {
                cy.log("❌ Le produit 1 ne correspond pas");
            }
        });

        cy.get(".inventory_item_price").invoke('text').then((prixPanier) => {
            if (prixPanier.trim() === produit1.prix) {
                cy.log("✅ Le prix du produit 1 est correct");
            } else {
                cy.log("❌ Le prix du produit 1 est incorrect");
            }
        });

        // === 🔸 Retour à la boutique
        cy.get("button[data-test='continue-shopping']").click();

        // === 🔸 Sélection du 2ème produit (index 5)
        cy.get(".inventory_item").eq(5).within(() => {
            cy.contains("Add to cart").click();
            cy.contains("Remove").should("be.visible");
            cy.get('.inventory_item_name').invoke('text').then((nom) => {
                produit2.nom = nom.trim();
                cy.log("Nom du produit 2 : " + produit2.nom);
            });
            cy.get('.inventory_item_price').invoke('text').then((prix) => {
                produit2.prix = prix.trim();
                cy.log("Prix du produit 2 : " + produit2.prix);
            });
        });

        // 🔹 Vérifier le panier a 2 produits
        cy.get("span[data-test='shopping-cart-badge']").should("have.text", "2");

        // === 🔸 Vérifier le contenu du panier
        cy.get("a[data-test='shopping-cart-link']").click();

        cy.get(".cart_item").should("have.length", 2);

        // Comparer le 2e produit
        cy.get(".inventory_item_name").eq(1).invoke('text').then((nomPanier2) => {
            if (nomPanier2.trim() === produit2.nom) {
                cy.log("✅ Le produit 2 est correct");
            } else {
                cy.log("❌ Le produit 2 ne correspond pas");
            }
        });

        cy.get(".inventory_item_price").eq(1).invoke('text').then((prixPanier2) => {
            if (prixPanier2.trim() === produit2.prix) {
                cy.log("✅ Le prix du produit 2 est correct");
            } else {
                cy.log("❌ Le prix du produit 2 est incorrect");
            }
        });
    });
});
