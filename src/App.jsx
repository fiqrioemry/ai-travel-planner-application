import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import useAuthChecking from "./hooks/useAuthChecking";

function App() {
  const { checkingAuth } = useAuthChecking();

  if (checkingAuth) return <PageLoading />;

  return (
    <>
      <Toaster />
      <Routes></Routes>
    </>
  );
}

export default App;
