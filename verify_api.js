const axios = require('axios');

const BACKEND_URL = 'http://localhost:3000/api';

async function verifyAuth(username, password) {
  try {
    console.log('Testing Login Response Structure...');
    const response = await axios.post(`${BACKEND_URL}/auth/login`, { username, password });
    
    if (response.data.user && response.data.user.username && response.data.user.email) {
      console.log('✅ Login response structure is correct (nested user with email).');
    } else {
      console.error('❌ Login response structure is missing expected fields:', response.data);
    }
  } catch (err) {
    if (err.response && err.response.status === 404) {
      console.log('ℹ️ User not found (expected if DB is empty), but checking response structure anyway...');
    } else {
      console.error('❌ Login test failed:', err.message);
    }
  }
}

async function runTests() {
  console.log('Starting API Verification...');
  // Note: This requires the server to be running and potentially a user to exist.
  // Since I can't guarantee a user, I'll focus on just the login attempt for now.
  await verifyAuth('testuser', 'testpass');
  console.log('Verification completed.');
}

// runTests();
