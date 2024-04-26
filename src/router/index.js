import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
// import Book from '../views/Book.vue';
import BooksService from '@/services/book.service';
import UserService from '@/services/user.service';
import BorrowedBookService from '@/services/borrowedbook.service';
import loginService from '@/services/login.service';

const email = await loginService.get();
const auth = await UserService.getOne(email.email);
const books = await BooksService.getAll();
const borrowedBook = await BorrowedBookService.getManyByUid(auth && auth._id);


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        books: books,
      }
    },
    // {
    //   path: '/book',
    //   name: 'books',
    //   component: Book,
    //   meta: {
    //     books: books,
    //   }
    // },
    {
      path: '/book/:id',
      name: 'book.detail',
      component: () => import('../views/BookDetail.vue'),
      meta: {
        books: books,
        user: auth,
      },
      props: true,
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('../views/Register.vue')
    },
    {
      path: '/borrowbooks',
      name: 'borrowbooks',
      component: () => import('../views/BorrowBook.vue'),
      meta: {
        bbooks: borrowedBook,
      }
    },
    {
      path: "/:pathMatch(.*)*",
      name: "notfound",
      component: () => import("@/views/NotFound.vue")
    },
  ]
});

export default router
