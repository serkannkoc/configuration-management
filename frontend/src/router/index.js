import {createRouter, createWebHistory} from "vue-router";
const Home = () => import("../views/Home.vue");
const SignIn = () => import("../views/SignIn.vue");
const routes = [
    {
        path: '/',
        name: "home",
        component: Home,
        meta: {requiresAuth: true},
    },
    {
        name: "signIn",
        path: '/signIn',
        component: SignIn,
        meta: {requiresAuth: false},
    },
    {
        path: "/:catchAll(.*)*",
        redirect: {name: "login"},
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    linkExactActiveClass: "text-yellow-500",
});
import {useAuthStore} from '../stores/authStore.js';

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    console.log(authStore.isAuthenticated)
    if (to.meta.requiresAuth && !authStore.isAuthenticated && to.name !== 'signIn') {
        next({name: 'signIn'})
    } else if (authStore.isAuthenticated && to.name === 'signIn') {
        // User is already authenticated and trying to access the sign-in page
        next({ name: 'home' });
    } else {
        // Continue with navigation
        next();
    }
})
export default router;