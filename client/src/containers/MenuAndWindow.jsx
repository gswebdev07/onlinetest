import React, { useState } from "react";
import "../static/styles/primary.css";
// Components
import Burger from "../components/UI/Burger";
import Close from "../components/UI/Close";

const MenuAndWindow = ({ menu, window }) => {
  const style = {
    display: "flex",
  };
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  const menuStyle = open ? "menu menu-open" : "menu";

  return (
    <div style={style}>
      <Burger trigger={toggle} />
      <Close open={open} trigger={toggle} />
      <div className={menuStyle}>{menu}</div>
      <div className="window">{window}</div>
    </div>
  );
};

export default MenuAndWindow;
