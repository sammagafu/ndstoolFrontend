import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home.vue')
    },
    {
      path: '/question',
      name: 'Question',
      component: () => import('../components/Question.vue')
    },
    {
      path:'/account',
      children : [
        {
          path: 'register',
          name: 'register',
          component: () => import('../views/Register.vue')
        },
        {
          path: 'login',
          name: 'login',
          component: () => import('../views/Login.vue')
        }
      ]
    },
    {
      path: '/data',
      name:'datalist',
      // component:() => import('../views/datacolletion/ListData.vue'),
      children : [
        {
          path:'create/',
          name:'createdata',
          component: () => import('@/views/datacolletion/CreateData.vue')
        },
        {
          path:':id/',
          name:'datadetail',
          component: () => import('../views/datacolletion/ViewData.vue')
        },
        {
          path:'detail/:id/update',
          name:'datadetail',
          component: () => import('../views/datacolletion/ViewData.vue')
        },
      ]
    }
  ]
})

export default router
