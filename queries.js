const Pool = require('pg').Pool;
const pool = new Pool({
   user: 'eshopadmin',
   host: 'localhost',
   database: 'eshopdb',
   password: 'admin',
   port: 5432,
});

// const getUsers = (req, res) => {
//    pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
//       if (error) {
//          throw error;
//       }
//       response.status(200).json(results.rows);
//    })
// };

// SIGN IN USER (Show GET to /account/:id)
const getUserById = (req, res) => {
   const id = parseInt(request.params.id);

   pool.query('SELECT * FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      response.status(200).json(results.rows);
   })
};

// NEW USER FORM (New - GET to /account/new)
const showUserForm = (req, res) => {
   res.render('sign-up');

};

// CREATE USER (New - POST to /account)
const createUser = (req, res) => {
   const { name, email } = req.body;

   pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [name, email], (error, results) => {
      if (error) {
         throw error;
      }
      response.status(201).send(`User added with ID:${result.insertId}`);
   }); 
};

// UPDATE USER DATA (Edit - PUT to /account/:id )
const updateUser = (req, res) => {
   const id = parseInt(request.params.id);
   const {name, email } = request.body;

   pool.query(
      'Update users SET name = $1, email = $2 WHERE id= $3',
      [name, email, id],
      (error, results) => {
         if (error) {
            throw error;
         }
         response.status(200).send(`User modified with ID: ${id}`);
      }
   );
};

// DELETE USER (Destroy - DELETE to /account/:id)
const deleteUser = (req, res) => {
   const id = parseInt(request.params.id);
   
   pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
      if (error) {
         throw error;
      }
      response.status(200).send(`User deleted with ID: ${id}`);
   });
};

module.exports = {
   getUserById,
   showUserForm,
   createUser,
   updateUser,
   deleteUser,
}

