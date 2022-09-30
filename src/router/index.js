import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import SignUpView from '../views/SignUpView.vue'
import UserProfileView from '../views/User/UserProfileView.vue'
import EditProfileView from '../views/User/EditProfileView.vue'
import CreatePostView from '../views/Post/CreatePostView.vue'

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView
  },
  {
    path: '/login',
    name: 'LoginView',
    component: LoginView
  },
  {
    path: '/signup',
    name: 'SignUpView',
    component: SignUpView
  },
  {
    path: '/profile/:id',
    name: 'UserProfileView',
    component: UserProfileView
  },
  {
    path: '/profile/:id/edit',
    name: 'EditProfileView',
    component: EditProfileView
  },
  {
    path: '/profile/:id/post/create',
    name: 'CreatePostView',
    component: CreatePostView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
