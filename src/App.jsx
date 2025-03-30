// page
import Home from "./pages/Home";
import SavedTrip from "./pages/SavedTrip";
import CreateTrip from "./pages/CreateTrip";
import DetailTrip from "./pages/DetailTrip";
import LoadingPage from "./components/LoadingPage";

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

  if (loading) return <LoadingPage />;

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
            path="trip/:tripId"
            element={
              <ProtectedRoute>
                <DetailTrip />
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
