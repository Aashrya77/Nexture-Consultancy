const axios = require('axios');

// Base URL for API
const API_URL = 'http://localhost:5000/api';

// Test data for creating a consultation
const testConsultation = {
  firstName: 'Test',
  lastName: 'User',
  email: 'test@example.com',
  phone: '1234567890',
  preferredDate: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
  alternateDate: new Date(Date.now() + 172800000).toISOString(), // Day after tomorrow
  preferredTime: 'morning',
  consultationType: 'study-abroad',
  countryOfInterest: 'australia',
  academicLevel: 'bachelors',
  consultationMode: 'video-call',
  message: 'This is a test consultation booking.'
};

// Admin credentials for testing protected routes
const adminCredentials = {
  email: 'admin@example.com',
  password: 'password123'
};

// Store tokens and consultation ID
let accessToken = '';
let consultationId = '';

// Helper function to log responses
const logResponse = (title, response) => {
  console.log(`\n=== ${title} ===`);
  console.log('Status:', response.status);
  console.log('Data:', JSON.stringify(response.data, null, 2));
};

// Helper function to log errors
const logError = (title, error) => {
  console.log(`\n=== ${title} ===`);
  console.log('Error:', error.message);
  if (error.response) {
    console.log('Status:', error.response.status);
    console.log('Data:', JSON.stringify(error.response.data, null, 2));
  }
};

// Test functions
const testCreateConsultation = async () => {
  try {
    const response = await axios.post(`${API_URL}/consultation`, testConsultation);
    logResponse('Create Consultation', response);
    consultationId = response.data.data._id;
    return true;
  } catch (error) {
    logError('Create Consultation', error);
    return false;
  }
};

const testAdminLogin = async () => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, adminCredentials);
    logResponse('Admin Login', response);
    accessToken = response.data.data.accessToken;
    return true;
  } catch (error) {
    logError('Admin Login', error);
    return false;
  }
};

const testGetAllConsultations = async () => {
  try {
    const response = await axios.get(`${API_URL}/consultation`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    logResponse('Get All Consultations', response);
    return true;
  } catch (error) {
    logError('Get All Consultations', error);
    return false;
  }
};

const testGetConsultationById = async () => {
  if (!consultationId) {
    console.log('\n=== Get Consultation By ID ===');
    console.log('Skipped: No consultation ID available');
    return false;
  }
  
  try {
    const response = await axios.get(`${API_URL}/consultation/${consultationId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    logResponse('Get Consultation By ID', response);
    return true;
  } catch (error) {
    logError('Get Consultation By ID', error);
    return false;
  }
};

const testUpdateConsultation = async () => {
  if (!consultationId) {
    console.log('\n=== Update Consultation ===');
    console.log('Skipped: No consultation ID available');
    return false;
  }
  
  try {
    const response = await axios.put(
      `${API_URL}/consultation/${consultationId}`,
      {
        ...testConsultation,
        status: 'confirmed',
        consultationNotes: 'This consultation has been confirmed.'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    logResponse('Update Consultation', response);
    return true;
  } catch (error) {
    logError('Update Consultation', error);
    return false;
  }
};

const testGetConsultationStats = async () => {
  try {
    const response = await axios.get(`${API_URL}/consultation/stats`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    logResponse('Get Consultation Stats', response);
    return true;
  } catch (error) {
    logError('Get Consultation Stats', error);
    return false;
  }
};

const testSubmitFeedback = async () => {
  if (!consultationId) {
    console.log('\n=== Submit Feedback ===');
    console.log('Skipped: No consultation ID available');
    return false;
  }
  
  try {
    // First, update the consultation status to completed
    await axios.put(
      `${API_URL}/consultation/${consultationId}`,
      {
        ...testConsultation,
        status: 'completed'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    
    // Then submit feedback
    const response = await axios.post(
      `${API_URL}/consultation/${consultationId}/feedback`,
      {
        rating: 5,
        comments: 'Excellent consultation service!'
      }
    );
    logResponse('Submit Feedback', response);
    return true;
  } catch (error) {
    logError('Submit Feedback', error);
    return false;
  }
};

const testRescheduleConsultation = async () => {
  if (!consultationId) {
    console.log('\n=== Reschedule Consultation ===');
    console.log('Skipped: No consultation ID available');
    return false;
  }
  
  try {
    // First, update the consultation status back to pending
    await axios.put(
      `${API_URL}/consultation/${consultationId}`,
      {
        ...testConsultation,
        status: 'pending'
      },
      {
        headers: { Authorization: `Bearer ${accessToken}` }
      }
    );
    
    // Then reschedule
    const response = await axios.post(
      `${API_URL}/consultation/${consultationId}/reschedule`,
      {
        preferredDate: new Date(Date.now() + 259200000).toISOString(), // 3 days from now
        preferredTime: 'afternoon'
      }
    );
    logResponse('Reschedule Consultation', response);
    return true;
  } catch (error) {
    logError('Reschedule Consultation', error);
    return false;
  }
};

const testDeleteConsultation = async () => {
  if (!consultationId) {
    console.log('\n=== Delete Consultation ===');
    console.log('Skipped: No consultation ID available');
    return false;
  }
  
  try {
    const response = await axios.delete(`${API_URL}/consultation/${consultationId}`, {
      headers: { Authorization: `Bearer ${accessToken}` }
    });
    logResponse('Delete Consultation', response);
    return true;
  } catch (error) {
    logError('Delete Consultation', error);
    return false;
  }
};

// Run all tests
const runTests = async () => {
  console.log('Starting API tests for consultation routes...');
  
  // Test public routes first
  const createSuccess = await testCreateConsultation();
  
  // Login as admin for protected routes
  const loginSuccess = await testAdminLogin();
  
  if (loginSuccess) {
    // Test protected routes
    await testGetAllConsultations();
    await testGetConsultationById();
    await testUpdateConsultation();
    await testGetConsultationStats();
    await testSubmitFeedback();
    await testRescheduleConsultation();
    await testDeleteConsultation();
  }
  
  console.log('\nAPI tests completed!');
};

// Run the tests
runTests().catch(console.error);
