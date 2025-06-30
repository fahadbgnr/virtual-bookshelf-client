import {
    createBrowserRouter,
} from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home";
import BookShelf from "../pages/Bookshelf/BookShelf";
import Register from "../pages/Register/Register";
import LogIn from "../pages/LogInPage/LogIn";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import BookDetails from "../pages/Bookshelf/BookDetails";
import AddBook from "../pages/AddBooks/AddBook";
import UpDateBook from "../pages/AddBooks/UpDateBook";
import MyBooks from "../pages/Profile/MyBooks";
import MyProfile from "../pages/Profile/MyProfile";
import PrivateRoute from "../routes/PrivateRoute";
import Loder from "../pages/LoadingPage/Loder";
import Category from "../pages/Home/Category/Category";
import About from "../pages/About/About";
import Contact from "../pages/Contact/Contact";


const router = createBrowserRouter([
    {
        path: "/",
        Component: RootLayout,
        children: [
            {
                index: true,
                Component: Home,
            },
            {
                path: 'bookShelf',
                loader: () => fetch('https://virtual-bookshelf-server-woad.vercel.app/books'),
                Component: BookShelf,
                hydrateFallbackElement: <Loder></Loder>
            },
            {
                path: 'bookDetails/:id',
                loader: ({ params }) => fetch(`https://virtual-bookshelf-server-woad.vercel.app/books/${params.id}`),
                Component: BookDetails,
                hydrateFallbackElement: <Loder></Loder>

            },
            {
                path: 'about',
                Component: About

            },
            {
                path: 'contact',
                Component: Contact
                
            },
            {
                path: 'addBook',
                element: <PrivateRoute>
                    <AddBook></AddBook>
                </PrivateRoute>
            },
            {
                path: 'upDateBook/:id',
                element: <PrivateRoute>
                    <UpDateBook></UpDateBook>
                </PrivateRoute>,
                hydrateFallbackElement: <Loder></Loder>
            },
            {
                path: 'myBook',
                element: <PrivateRoute>
                    <MyBooks></MyBooks>
                </PrivateRoute>


            },
            {
                path: 'myProfile',
                element: <PrivateRoute>
                    <MyProfile></MyProfile>
                </PrivateRoute>

            },


            {
                path: '/register',
                Component: Register,
            },
            {
                path: '/logIn',
                Component: LogIn,
            },
        ]
    },
    {
        path: 'category/:categoryName',
        Component: Category,
        hydrateFallbackElement: <Loder></Loder>

    },

    {
        path: '/*',
        Component: ErrorPage,
    }
]);

export default router;