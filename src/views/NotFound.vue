<template>
    <div class="flex flex-col items-center justify-center h-screen">
      <h1 class="text-6xl font-bold mb-4">404</h1>
      <p class="text-2xl">ECD Page not found</p>
      <router-link :to="{name:'home'}" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Go Home</router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NotFound',
  }
  </script>