import LoginPage from "../pages/LoginPage";
import HomeNavigation from "../navigation/HomeNavigation";
import DashboardPage from "../pages/DashboardPage";
import ConfirmedPage from "../pages/ConfirmedPage";
import UnconfirmedPage from "../pages/UnconfirmedPage";
import DonePage from "../pages/DonePage";


export const homeRoutes = [
  {
    path: "/",
    element: <LoginPage/>,
  },
  {
    path: "/home/",
    element: <HomeNavigation />,
    children: [
      {
        path: "dashboard",
        element: <DashboardPage />,
      },
      {
        path: "confirmed",
        element: <ConfirmedPage/>,
      },
      {
        path: "unconfirmed",
        element: <UnconfirmedPage/>,
      },
      {
        path: "done",
        element:<DonePage/> ,
      },
    ],
  },
]