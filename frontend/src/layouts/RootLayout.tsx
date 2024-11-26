import { HeaderSimple } from "../components/Header";
import { PATHS } from "../constants/Navigation";
import { Outlet } from "react-router-dom";
import { AuthUserProvider } from "../auth/AuthUserProvider";
import { Toaster } from "../components/toaster";

const RootLayout = () => (
    <div>
        <HeaderSimple links={PATHS} />
        <div>
        <AuthUserProvider><Outlet /></AuthUserProvider>
        <Toaster />
            
        </div>
    </div>
);

export default RootLayout;
