
import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import Dashboard from "./pages/Dashboard";
import FluxIntro from "./pages/FluxIntro";
import { me } from "./features/me";
import { setUserData } from "./redux/userSlice";

const App = () => {
  const dispatch = useDispatch();

  const [introDone, setIntroDone] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    let active = true;

    // Keep the intro visible for at least 2.5 seconds.
    const introTimer = setTimeout(() => {
      if (active) setIntroDone(true);
    }, 2500);

    // Check the user's existing session.
    const checkAuth = async () => {
      try {
        const data = await me();

        if (active) {
          dispatch(setUserData(data ?? null));
        }
      } catch (error) {
        console.error("Session check failed:", error);

        if (active) {
          dispatch(setUserData(null));
        }
      } finally {
        if (active) {
          setAuthChecked(true);
        }
      }
    };

    checkAuth();

    return () => {
      active = false;
      clearTimeout(introTimer);
    };
  }, [dispatch]);

  // Wait for both the intro and the authentication check.
  if (!introDone || !authChecked) {
    return <FluxIntro />;
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
