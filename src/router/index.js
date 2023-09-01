import Vue from 'vue'
import VueRouter from 'vue-router'
import UsersList from '../components/UsersList.vue';
import UserCreate from '../components/UserCreate.vue';
import UserUpdate from '../components/UserUpdate.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'usersList',
    component: UsersList
  },
  {
    path: '/create',
    name: 'userCreate',
    component: UserCreate
  },
  {
    path: '/update/:id',
    name: 'userUpdate',
    props: true,
    component: UserUpdate
  },
]

const router = new VueRouter({
  mode:'history',
  routes
})

export default router
