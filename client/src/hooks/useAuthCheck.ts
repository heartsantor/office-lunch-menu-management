import { size } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { userLoggedIn } from "../store/features/auth/authSlice";

const useAuthCheck = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const authString = localStorage.getItem("auth");
    const auth = authString ? JSON.parse(authString) : null;

    if (size(auth)) {
      const userInfo = {
        accessToken: auth?.accessToken,
        user: auth?.user,
      };

      if (auth?.accessToken && auth?.user) {
        dispatch(userLoggedIn(userInfo));
      }
    }
    setTimeout(() => {
      setAuthChecked(true);
    }, 1000);
  }, [dispatch]);

  return authChecked;
};

export default useAuthCheck;
