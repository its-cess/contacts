import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AddContactForm from "../views/AddContactForm.vue";
import FavoriteContacts from "../views/FavoriteContacts.vue";
import EditContactForm from "../views/EditContactForm.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
      meta: {
        title: "Contacts"
      }
    },
    {
      path: "/add",
      name: "addContact",
      component: AddContactForm,
      meta: {
        title: "Add Contact"
      }
    },
    {
      path: "/favs",
      name: "favorites",
      component: FavoriteContacts,
      meta: {
        title: "Favorite Contacts"
      }
    },
    {
      path: "/edit/:id",
      name: "editContact",
      component: EditContactForm,
      meta: {
        title: "Edit Contact"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title} | Contacts App`;
  next();
});

export default router;
