import { createHashRouter } from "react-router-dom";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import {AuthRouter} from "../components/AuthRouter.tsx";
import Home from "../pages/Dashboard/Home";
import Notes from "../pages/Dashboard/Notes";
import Comments from "../pages/Dashboard/Comments";
import Albums from "../pages/Dashboard/Albums";
import Friends from "../pages/Dashboard/Friends";
import Analytics from "../pages/Dashboard/Analytics";
import UserControl from "../pages/Dashboard/UserControl";
import AllNotes from "../pages/Dashboard/Notes/AllNotes";
import NewNotes from "../pages/Dashboard/Notes/NewNotes";
import AllCategorize from "../pages/Dashboard/Notes/AllCategorize";
import AllTag from "../pages/Dashboard/Notes/AllTag";

const router = createHashRouter([
    {
        index: true,
        element: <Login />
    },
    {
        path: '/dashboard',
        element: <AuthRouter> <Dashboard /> </AuthRouter>,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'notes',
                element: <Notes />,
                children: [
                    {
                        index: true,
                        element: <AllNotes />
                    },
                    {
                        path: 'newnote/:id?', // 在:id后面加上问号?表示id参数可选
                        element: <NewNotes />,
                    },
                    {
                        path: 'allcategorize',
                        element: <AllCategorize />
                    },
                    {
                        path: 'alltags',
                        element: <AllTag />
                    }
                ]
            },
            {
                path: 'comments',
                element: <Comments />
            },
            {
                path: 'albums',
                element: <Albums />
            },
            {
                path: 'friends',
                element: <Friends />
            },
            {
                path: 'analytics',
                element: <Analytics />
            },
            {
                path: 'usercontrol',
                element: <UserControl />
            }
        ]

    }
])

export default router