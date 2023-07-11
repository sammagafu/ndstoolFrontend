// apiService.js

import axios from 'axios';
import router from '@/router'; // Assuming you have Vue Router set up

const apiClient = axios.create({
  baseURL: 'https://nsd.pediatrics.or.tz/api/v1/', // Update with your Django API URL
  timeout: 5000, // Timeout duration in milliseconds
});
        // headers:{
        //     'Authorization' : "Token " + userstore.authToken   
        // }
// Add an interceptor to include the token in the header
apiClient.interceptors.request.use(
  config => {
    const authToken = localStorage.getItem('token'); // Retrieve the token from local storage
    if (authToken) {
      config.headers.Authorization = `Token ${authToken}`;
    }

    return config;
  },
  error => Promise.reject(error)
);

// Add an interceptor to handle response errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response.status === 401) {
      // Unauthorized error, redirect to login page
      router.push('account/login');
    }
    return Promise.reject(error);
  }
);

export default {
    get(endpoint) {
        return apiClient.get(endpoint);
      },
    
      post(endpoint, data) {
        return apiClient.post(endpoint, data);
      },
    
      put(endpoint, data) {
        return apiClient.put(endpoint, data);
      },
    
      delete(endpoint) {
        return apiClient.delete(endpoint);
      },
};
