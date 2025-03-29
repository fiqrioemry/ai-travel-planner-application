import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import Layout from "./components/layout/Layout";
import { Route, Routes } from "react-router-dom";
// import useAuthChecking from "./hooks/useAuthChecking";

function App() {
  // const { checkingAuth } = useAuthChecking();

  // if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
