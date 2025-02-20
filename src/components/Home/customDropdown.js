"use client";
import { Dropdown } from "@mui/base/Dropdown";
import { Menu } from "@mui/base/Menu";
import { MenuButton as BaseMenuButton } from "@mui/base/MenuButton";
import { MenuItem as BaseMenuItem, menuItemClasses } from "@mui/base/MenuItem";
import { CssTransition } from "@mui/base/Transitions";
import { PopupContext } from "@mui/base/Unstable_Popup";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { Typography } from "@mui/material";
import { styled } from "@mui/system";
import PropTypes from "prop-types";
import * as React from "react";

export default function MenuTransitions({ selectedOption, setSelectedOption }) {
  const [isOpen, setIsOpen] = React.useState(false);

  const handleMenuClick = (menuItem) => {
    setSelectedOption(menuItem);
  };

  const toggleMenuState = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <Dropdown sx={{ zIndex: 30 }}>
      <MenuButton
        sx={{
          padding: "10px",
          zIndex: 24,
          height: { sm: "72px", xs: "53px" },
        }}
        onClick={toggleMenuState}
      >
        <Typography
          component="div"
          style={{
            fontFamily: "Skrapbook",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {selectedOption}
          {isOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
        </Typography>
      </MenuButton>
      <Menu
        slots={{ listbox: AnimatedListbox }}
        slotsprops={{
          listbox: {
            style: {
              marginTop: "0px",
            },
          },
        }}
        anchororigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        style={{ zIndex: 24 }}
        open={() => setIsOpen(true)}
        onClose={() => setIsOpen(false)}
      >
        <MenuItem onClick={() => handleMenuClick("Graduating")}>
          &nbsp;&nbsp;&nbsp;Graduating
        </MenuItem>
        <MenuItem
          style={{ borderBottom: "4px solid black" }}
          onClick={() => handleMenuClick("Starting")}
        >
          &nbsp;&nbsp;&nbsp;Starting
        </MenuItem>
        <MenuItem onClick={() => handleMenuClick("Live")}>
          &nbsp;&nbsp;&nbsp;Live
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

const Listbox = styled("ul")(
  () => `
  font-family: 'Skrapbook', sans-serif;
  font-size: 0.875rem;
  box-sizing: border-box;
  margin: 0;
  width: 196px;
  border-radius: 20px 20px 20px 20px;
  overflow: hidden;
  outline: 0;
  background: #000000;
  color: #333;
  
  border-top: 2px solid #000000;  /* Top border */
  border-bottom: 5px solid #000000;  /* Bottom border */
  border-left: 4px solid #000000; /* No left border */
  border-right: 2px solid #000000; /* No right border */
  
  z-index: 999;

  .closed & {
    max-height: 0;
    opacity: 0;
    transform: scaleY(0.8);
    transition: max-height 200ms ease-in, opacity 200ms ease-in, transform 200ms ease-in;
  }
  
  .open & {
    opacity: 1;
    transform: scaleY(1);
    transition: max-height 200ms ease-out, opacity 200ms ease-out, transform 200ms ease-out;
  }

  .placement-top & {
    transform-origin: bottom;
  }

  .placement-bottom & {
    transform-origin: top;
  }
  `
);

const AnimatedListbox = React.forwardRef(function AnimatedListbox(props, ref) {
  const { ownerState, ...other } = props;
  const popupContext = React.useContext(PopupContext);

  if (popupContext == null) {
    throw new Error(
      "The `AnimatedListbox` component cannot be rendered outside a `Popup` component"
    );
  }

  const verticalPlacement = popupContext.placement.split("-")[0];

  return (
    <CssTransition
      className={`placement-${verticalPlacement}`}
      enterClassName="open"
      exitClassName="closed"
    >
      <Listbox {...other} ref={ref} />
    </CssTransition>
  );
});

AnimatedListbox.propTypes = {
  ownerState: PropTypes.object.isRequired,
};

const MenuItem = styled(BaseMenuItem)(
  () => `
  display: flex;
  align-items: center;
  list-style: none;
  border-radius: 20px;
  padding: 6px;
  cursor: pointer;
  user-select: none;
  width: 188px;
  height: 60px;
  background: #ffffff;
  border: 2px solid #000000;
  &:last-of-type {
    border-bottom: none;
  }

  &.${menuItemClasses.focusVisible} {
    outline: none;
    background-color: #e0e0e0;
  }

  &.${menuItemClasses.disabled} {
    color: #aaa;
  }

  &:hover:not(.${menuItemClasses.disabled}) {
    background-color: #f5f5f5;
  }
  `
);

const MenuButton = styled(BaseMenuButton)(
  () => `
  font-family: 'Skrapbook', sans-serif;
  font-weight: 600;
  font-size: 0.875rem;
  line-height: 1.5;
  width: 192px;
  padding: 4px;
  margin-left: 10px;
  border-radius: 20px;
  transition: all 150ms ease;
  cursor: pointer;
  background: #ffffff;
  border: 2px solid black;
  color: #333;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  `
);
