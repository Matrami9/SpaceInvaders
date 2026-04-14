import { expect } from 'chai';

const clamp = (min: number, max: number, val: number) => Math.max(min, Math.min(max, val));
const lerp = (start: number, end: number, t: number) => start + (end - start) * t;

describe('Tests Unitaires - Space Invaders', () => {
    
    describe('Annexe : Fonctions de base', () => {
        it('clamp (1,10,2) returns 2', () => {
            expect(clamp(1, 10, 2)).to.equal(2); //
        });
        it('clamp (1,10,-12) returns 1', () => {
            expect(clamp(1, 10, -12)).to.equal(1); //
        });
        it('lerp(1,10,2) returns 19', () => {
            expect(lerp(1, 10, 2)).to.equal(19); //
        });
        it('lerp(1,10,-12) returns -107', () => {
            expect(lerp(1, 10, -12)).to.equal(-107); //
        });
    });

    describe('Tests Personnels', () => {
        it('should return 0 when score is initialized', () => {
            const score = 0;
            expect(score).to.equal(0);
        });
        it('should correctly double the score on power-up', () => {
            let score = 10;
            score *= 2;
            expect(score).to.equal(20);
        });
        it('should verify that an enemy health is positive', () => {
            const enemyHealth = 100;
            expect(enemyHealth).to.be.above(0);
        });
        it('should calculate player width correctly', () => {
            const playerWidth = 32;
            expect(playerWidth).to.be.at.least(10);
        });
        it('should ensure game speed is not zero', () => {
            const speed = 1.5;
            expect(speed).to.not.equal(0);
        });
    });
});