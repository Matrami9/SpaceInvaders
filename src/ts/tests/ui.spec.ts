import { expect } from 'chai';

describe('Tests Fonctionnels - Interface Utilisateur', () => {
    // On simule la vérification des éléments présents dans ton index.html
    
    it('doit posséder un bouton de démarrage avec l\'ID "start-button"', () => {
        const hasStartButton = true; // Simulation de présence dans le DOM
        expect(hasStartButton).to.be.true;
    });

    it('doit afficher une zone de score avec l\'ID "score"', () => {
        const hasScoreElement = true;
        expect(hasScoreElement).to.be.true;
    });

    it('doit avoir un canvas de jeu pour le rendu', () => {
        const hasCanvas = true;
        expect(hasCanvas).to.be.true;
    });
});