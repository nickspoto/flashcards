import { MantineProvider } from "@mantine/core";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorPage from "./pages/Error";
import RootLayout from "./layouts/RootLayout";
import { PATHS } from "./constants/Navigation";
import { UserProvider } from "./UserContext";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      ...PATHS.map((item) => ({
        path: item.link,
        element: item.element,
      })),
    ],
  },
]);

export default function App() {
  return (
    <UserProvider>
      <MantineProvider withGlobalStyles withNormalizeCSS>
        <RouterProvider router={router} />
      </MantineProvider>
    </UserProvider>
  );
}
