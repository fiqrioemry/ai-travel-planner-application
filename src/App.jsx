// page
import Home from "./pages/Home";
import SavedTrip from "./pages/SavedTrip";
import CreateTrip from "./pages/CreateTrip";
import DisplayTrip from "./pages/DisplayTrip";

// configuration
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { ProtectedRoute } from "./middleware";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";

function App() {
  const { loading, authCheck } = useAuthStore();

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  if (loading) return null;

  return (
    <>
      <Toaster />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="my-trips"
            element={
              <ProtectedRoute>
                <SavedTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="trip/:id"
            element={
              <ProtectedRoute>
                <DisplayTrip />
              </ProtectedRoute>
            }
          />
          <Route
            path="create-trip"
            element={
              <ProtectedRoute>
                <CreateTrip />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;
