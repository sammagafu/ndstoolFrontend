import { createRouter, createWebHistory } from 'vue-router'
import { userStore } from "@/stores/counter"


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
      children : [
        {
          path:'create',
          name:'createdata',
          component: () => import('@/components/index.vue'),
          children : [
            {
              path: 'base',
              name: 'base',
              component: () => import("../components/parentComp.vue"),
              children:[
                {
                  path: 'patient',
                  name: 'patient',
                  component: () => import("../components/_patientInfo.vue")
                },
                {
                  path: 'question',
                  name: 'question',
                  component: () => import("../components/_questions.vue")
                },
                {
                  path: 'comment',
                  name: 'comment',
                  component: () => import("../components/_overallcomment.vue")
                }
              ]
            },
            
          ],
          meta: {
            requiresAuth: true
          }
        },
        {
          path:'',
          name:'attandedPatients',
          component:()=>import('../views/datacolletion/ListData.vue')
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

router.beforeEach((to,from,next)=> {
  const store = userStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  // console.log('store :>> ', store);
  if(requiresAuth && !store.authToken){
    console.log('store.authToken :>> ', store.authToken);
    next('/account/login');
  }
  else{
    next();
  }
});


export default router


