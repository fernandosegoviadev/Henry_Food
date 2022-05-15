const { Recipe, Diet, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Recipe model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {

    beforeEach(() => Recipe.sync({ force: true }));

    describe('name', () => {

      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ name: 'Milanesa a la napolitana' });
      });

    });

    describe('resume', () => {

      it('should throw an error if resume is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid resume')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ resume: 'La milanesa a la napolitana es un plato típico...' });
      });

    });

    describe('score', () => {

      it('should be accepted an integer', (done) => {
        Recipe.create({ score: "Not an integer" })
          .then(() => done(new Error('It requires a valid score')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ score: 50 });
      });

    });

    beforeEach(() => Diet.sync({ force: true }));

    describe('name', () => {

      it('should throw an error if name is null', (done) => {
        Recipe.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });

      it('should work when its a valid name', () => {
        Recipe.create({ name: 'carnivora' });
      });

    });
    

  });



});
