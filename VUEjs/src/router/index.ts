import { createRouter, createWebHistory } from "vue-router";

import MainLayout from "../pages/MainLayout.vue";
import Home from "../pages/Home.vue";
import About from "../pages/About.vue";
import Contacts from "../pages/Contacts.vue";
import Practice2 from "../pages/Practice2.vue";
import EditProduct from "../components/EditProduct.vue";
import Practice3 from "../pages/Practice3.vue";
import Practice4 from "../pages/Practice4.vue";
import { useAuthStore } from "../stores/storeAuth";

const routes = [
  {
    path: "/",
    name: "MainLayout",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "Home",
        component: Home
      }, {
        path: "about",
        name: "About",
        component: About
      }, {
        path: "contacts",
        name: "Contacts",
        component: Contacts,
        meta: {
          requiresAuth: true, roles: ['User']
        }
      }
    ]
  },
  {
    path: "/practice2",
    name: "Practice 2",
    component: Practice2,
    children: [
      {
        path: "edit/:id",
        name: "EditProduct",
        component: EditProduct,
        props: true
      }
    ]
  }, {
    path: "/practice3",
    name: "Practice 3",
    component: Practice3,
    meta: {
      requiresAuth: true, roles: ['Admin']
    }
  }, {
    path: "/practice4",
    name: "Practice 4",
    component: Practice4,
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach((to, from, next) => {
  const storeAuth = useAuthStore();
  const isAuthenticated = storeAuth.isAuthenticated;
  const roles = storeAuth.userRole;

  if (to.meta.requiresAuth) {
    if (!isAuthenticated) {
      next({ name: 'Practice 4' });
      alert('U need Login');
    } else if (Array.isArray(to.meta.roles) && !to.meta.roles.includes(roles || '')) {
      alert('U dont role');
      next({ name: 'Practice 4' });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;