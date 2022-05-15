/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Recipe, Diet, conn } = require('../../src/db.js');

const agent = session(app);
// const recipe = {
//   name: 'Milanea a la napolitana',
// };

describe('Recipe routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  //beforeEach(() => Recipe.sync({ force: true })
  //  .then(() => Recipe.create(recipe)));
      
  describe('GET /api/recipes', () => {
    it('should get 200', () =>
      agent.get('/api/recipes').expect(200)
    );
  });

  describe('POST /api/recipes', () => { // No le mando nada por eso espero un 404
    it('should post 404', () =>
      agent.post('/api/recipes').expect(404)
    );
  });

  describe('GET /api/types', () => {
    it('should get 200', () =>
      agent.get('/api/types').expect(200)
    );
  });

  describe('POST /api/types', () => { // Para mi bulk create
    it('should post 400', () =>
      agent.post('/api/types').expect(400) // No envío info por eso espero un 400
    );
  });
  
  describe('POST /api/types/add', () => { // Para agregar una dieta
    it('should post 400', () =>
      agent.post('/api/types/add').expect(400) // No envío info por eso espero un 400
    );
  });

});
