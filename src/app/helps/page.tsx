"use client";

import React from "react";
import Banner from "./components/banner";
import Loader from "../../components/loader"; // Adjust path if needed

function Page() {
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 3000); // Simulated loading time

    return () => clearTimeout(timeout);
  }, []);

  return <div>{loading ? <Loader /> : <Banner />}</div>;
}

export default Page;
