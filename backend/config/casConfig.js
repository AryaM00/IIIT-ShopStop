const casConfig = {
    cas_url: 'https://login.iiit.ac.in/cas',
    service_url: process.env.BACKEND_URL || 'http://localhost:5000', 
    cas_version: '3.0'
};

module.exports = { casConfig };