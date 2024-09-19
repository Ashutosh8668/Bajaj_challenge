const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const API_URL = 'https://bfhldevapigw.healthrx.co.in/automation-campus/create/user';

// Helper function to make API calls
async function testCreateUser(rollNumber, firstName, lastName, phoneNumber, emailId) {
    try {
        const response = await axios.post(API_URL, {
            firstName,
            lastName,
            phoneNumber,
            emailId
        }, {
            headers: {
                'roll-number': rollNumber,
                'Content-Type': 'application/json'
            }
        });
        return { status: response.status, data: response.data };
    } catch (error) {
        return { 
            status: error.response ? error.response.status : 500, 
            data: error.response ? error.response.data : 'Error occurred' 
        };
    }
}

// Test cases
const testCases = [
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Ashutosh', lastName: 'Rajput', phoneNumber: 8668433220, emailId: 'ashutosh.rajput@mitaoe.ac.in' }
    },
    {
        name: 'Duplicate phone number',
        params: { rollNumber: '1', firstName: 'Karan', lastName: 'Singh', phoneNumber: 8668433220, emailId: 'karan.singh@test.com' }
    },
    {
        name: 'Missing roll number',
        params: { rollNumber: '', firstName: 'Harsh', lastName: 'Joshi', phoneNumber: 8888888888, emailId: 'harsh.joshi@test.com' }
    },
    {
        name: 'Invalid email format',
        params: { rollNumber: '1', firstName: 'Amit', lastName: 'Kulkarni', phoneNumber: 7777777777, emailId: 'invalid-email' }
    },
    {
        name: 'Missing required field (firstName)',
        params: { rollNumber: '1', firstName: '', lastName: 'Kumar', phoneNumber: 6666666666, emailId: 'kumar.kumar@test.com' }
    },
    {
        name: 'Duplicate email address',
        params: { rollNumber: '1', firstName: 'Ankit', lastName: 'Desai', phoneNumber: 5555555555, emailId: 'ashutosh.rajput@mitaoe.ac.in' }
    },
    {
        name: 'Very long input strings',
        params: { rollNumber: '1', firstName: 'LongFirstName'.repeat(50), lastName: 'LongLastName'.repeat(50), phoneNumber: 4444444444, emailId: 'long@example.com' }
    },
    {
        name: 'Non-numeric phone number',
        params: { rollNumber: '1', firstName: 'Sneha', lastName: 'Sharma', phoneNumber: 'not-a-number', emailId: 'sneha.sharma@test.com' }
    },
    {
        name: 'Missing last name',
        params: { rollNumber: '1', firstName: 'Ritika', lastName: '', phoneNumber: 3333333333, emailId: 'ritika@test.com' }
    },
    {
        name: 'Special characters in name',
        params: { rollNumber: '1', firstName: 'Tanvi', lastName: 'Yadav!#', phoneNumber: 2222222222, emailId: 'tanvi.yadav@test.com' }
    },
    {
        name: 'Empty request body',
        params: { rollNumber: '1', firstName: '', lastName: '', phoneNumber: '', emailId: '' }
    },
    {
        name: 'Valid user creation with different names',
        params: { rollNumber: '1', firstName: 'Aarav', lastName: 'Mehta', phoneNumber: 9998887776, emailId: 'aarav.mehta@test.com' }
    },
    {
        name: 'Another valid user creation',
        params: { rollNumber: '1', firstName: 'Akash', lastName: 'Bansal', phoneNumber: 9112223333, emailId: 'akash.bansal@test.com' }
    },
    {
        name: 'Duplicate email address check',
        params: { rollNumber: '1', firstName: 'Vikas', lastName: 'Kapoor', phoneNumber: 9223334444, emailId: 'akash.bansal@test.com' }
    },
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Rohit', lastName: 'Mishra', phoneNumber: 9334445555, emailId: 'rohit.mishra@test.com' }
    },
    {
        name: 'Another valid user creation',
        params: { rollNumber: '1', firstName: 'Aditya', lastName: 'Mehta', phoneNumber: 9445556666, emailId: 'aditya.mehta@test.com' }
    },
    {
        name: 'Valid user creation with different names',
        params: { rollNumber: '1', firstName: 'Ananya', lastName: 'Kulkarni', phoneNumber: 9556667777, emailId: 'ananya.kulkarni@test.com' }
    },
    {
        name: 'SQL Injection-like input',
        params: { rollNumber: '1', firstName: 'Rahul', lastName: 'Sharma; DROP TABLE users;', phoneNumber: 9667778888, emailId: 'rahul.sharma@test.com' }
    },
    {
        name: 'Valid user creation',
        params: { rollNumber: '1', firstName: 'Suresh', lastName: 'Kumar', phoneNumber: 9778889999, emailId: 'suresh.kumar@test.com' }
    },
    {
        name: 'Special characters in email',
        params: { rollNumber: '1', firstName: 'Pooja', lastName: 'Yadav', phoneNumber: 7777777777, emailId: 'pooja!yadav@test.com' }
    },
];

// Route to run all tests
app.get('/run-tests', async (req, res) => {
    const results = [];

    for (const testCase of testCases) {
        console.log(`Running test: ${testCase.name}`);
        const result = await testCreateUser(
            testCase.params.rollNumber,
            testCase.params.firstName,
            testCase.params.lastName,
            testCase.params.phoneNumber,
            testCase.params.emailId
        );
        results.push({
            testName: testCase.name,
            status: result.status,
            response: result.data
        });
    }

    res.json(results);
});

// Start the server
app.listen(port, (err) => {
    if (err) {
        console.error('Error starting the server:', err);
        return;
    }
    console.log(`Test server running at http://localhost:${port}`);
    console.log(`Run tests by visiting http://localhost:${port}/run-tests`);
});

// Add this line at the very end of the file
console.log('Script executed. If you don\'t see the server running message, there might be an error.');
