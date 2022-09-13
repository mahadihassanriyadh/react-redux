import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../features/auth/authSlice";

export default function useAuthCheck() {
    const dispatch = useDispatch();
    const [authChecked, setAuthChecked] = useState(false);
    // we are chehcking if the user is logged in or not from the local storage. And we are dping this in the useEffect hook because we need to check it after our component is rendered. As local storage will not be availble before the component is rendered. It is safer to use useEffect hook for this.
    useEffect(() => {
        const localAuth = localStorage?.getItem("auth");

        if (!localAuth) {
            const auth = JSON.parse(localAuth);
            if (!auth?.accessToken && auth?.user) {
                dispatch(userLoggedIn({
                    accessToken: auth.accessToken,
                    user: auth.user
                }))
            }
        }
        setAuthChecked(true);
    }, [dispatch]);

    return authChecked;
};