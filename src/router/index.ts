import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import BinarySearch from '../views/BinarySearch.vue'
import BubbleSort from '../views/BubbleSort.vue'
import Pathfinding from '../views/Pathfinding.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/binarySearch',
      name: 'binarySearch',
      component: BinarySearch
    },
    {
      path: '/bubbleSort',
      name: 'bubbleSort',
      component: BubbleSort
    },
    {
      path: '/pathfinding',
      name: 'pathfinding',
      component: Pathfinding
    }
  ]
})

export default router
