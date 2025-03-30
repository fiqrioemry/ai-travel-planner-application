import Header from "./Header";
import { Fragment } from "react";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import { useTripStore } from "@/store/useTripStore";
import LoadingTripCreation from "@/components/LoadingTripCreation";

const Layout = () => {
  const { loading } = useTripStore();
  return (
    <Fragment>
      <Header />
      {loading && <LoadingTripCreation />}
      <Outlet />
      <Footer />
    </Fragment>
  );
};

export default Layout;
