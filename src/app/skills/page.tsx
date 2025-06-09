"use client";

import React from "react";
import Banner from "./components/banner";
import { usePathname } from "next/navigation";
import Loader from "../../components/loader";

function Page() {
  const pathname = usePathname();
  const [loading, setLoading] = React.useState(true); // set initial loading to true

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setLoading(false); // hide loader after 3 seconds
    }, 3000);

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <div>{loading ? <Loader /> : <Banner />}</div>;
}

export default Page;
