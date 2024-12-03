import Editing from "../pages/Editing";
import HomePage from "../pages/Home";
import AccountPage from "../pages/Account";
import View from "../pages/View";
import { useUser } from "../UserContext";

type User = {
  email: string;
  password: string;
};

const LogIn = () => {
  const { setUser } = useUser();
  const handleLogin = (email: string, password: string) => {
    const newUser: User = {
      email,
      password,
    };
    setUser(newUser);
    console.log("User logged in:", newUser);
  };
  //now we have the user data! need a way to get it to the editing tab
  return AccountPage(handleLogin);
};

/**
 * TODO: Modify this constant to point to the URL of your backend.
 * It should be of the format "https://<app-name>.fly.dev/api"
 *
 * Most of the time, the name of your app is the name of the folder you're in
 * right now, and the name of your Git repository.
 * For instance, if that name is "my-app", then you should set this to:
 * "https://my-app.fly.dev/api"
 *
 * If you've already deployed your app (using `fly launch` or `fly deploy`),
 * you can find the name by running `flyctl status`, under App > Name.
 */
export const BACKEND_BASE_PATH = "https://flashcards-ms4f.netlify.app/api";

export const PATHS: {
  link: string;
  label: string;
  element?: JSX.Element;
}[] = [
  {
    link: "/",
    label: "Home",
    element: <HomePage />,
  },
  {
    link: "/login",
    label: "Login",
    element: <LogIn />,
  },

  {
    link: "/view",
    label: "View",
    element: <View />,
  },
  {
    link: "/edit/:setName",
    label: "",
    element: <Editing />,
  },
];
