import { createRouter, createWebHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'
import MapPage from '../views/MapPage.vue'
import AdminAddPlace from '../components/AdminAddPlace.vue'

const routes =[
    {path: '/', component: HomePage},
    {path: '/map', component: MapPage},
    {path: '/admin', component: AdminAddPlace}
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router