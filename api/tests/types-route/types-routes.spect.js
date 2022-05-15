// /* eslint-disable import/no-extraneous-dependencies */
// const { expect } = require('chai');
// const session = require('supertest-session');
// const app = require('../../src/app.js');
// const { Recipe, Diet, conn } = require('../../src/db.js');

// const agent = session(app);

// const type = {
//   name: "dieta nueva"
// };

// const newType = {
//     name: "dieta nueva"
// };

// const forBulk = [
//     { name: "dairy free" },
//     { name: "gluten free" },
//     { name: "lacto ovo vegetarian" },
//     { name: "paleolithic" },
//     { name: "primal" },
//     { name: "vegan" }
//    ];

// describe('Recipe routes', () => {
//   before(() => conn.authenticate()
//   .catch((err) => {
//     console.error('Unable to connect to the database:', err);
//   }));

//   beforeEach(() => Diet.sync({ force: true })
//        .then(() => Recipe.create(type)));
   
  

//   describe('GET /api/types', () => {
//     it('should get 200', () =>
//       agent.get('/api/types').expect(200)
//     );
//   });

//   describe('POST /api/types', () => { // Para mi bulk create
//     it('should post 400', () =>
//       agent.post('/api/types').expect(400) // No envío info por eso espero un 400
//     );
//   });
  
//   describe('POST /api/types/add', () => { // Para agregar una dieta
//     it('should post 400', () =>
//       agent.post('/api/types/add').expect(400) // No envío info por eso espero un 400
//     );
//   });

// });