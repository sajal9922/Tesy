// test.js
const createUserWithRole = require('./controllers/createUserController');

async function testCreateUserWithRole() {
  try {
    await createUserWithRole();
    console.log('User created successfully');
  } catch (err) {
    console.error('Failed to create user:', err);
  }
}

testCreateUserWithRole();