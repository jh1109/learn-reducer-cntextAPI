import React from "react";

import Navigation from "./Navigation";
import classes from "./MainHeader.module.css";

// 하위 컴포넌트인 Navigation 으로의 전달만을 위해 props를 사용했기 때문에,
// context API 사용
const MainHeader = () => {
  return (
    <header className={classes["main-header"]}>
      <h1>A Typical Page</h1>
      <Navigation />
    </header>
  );
};

export default MainHeader;
