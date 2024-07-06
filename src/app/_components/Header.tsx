import React from "react";
import HeaderRight from "./_Header/HeaderRight";
import HeaderLeft from "./_Header/HeaderLeft";

function Header() {
  // const user = null;

  return (
    <div
      style={{ zIndex: 1 }}
      className="sticky top-0 flex justify-between bg-white px-[20px] py-[15px] shadow-[0px_4px_20px_-24px_black] md:px-[20px] md:py-[15px] xl:px-[80px] xl:py-[25px]"
    >
      <HeaderLeft />
      <HeaderRight />
    </div>
  );
}

export default Header;
