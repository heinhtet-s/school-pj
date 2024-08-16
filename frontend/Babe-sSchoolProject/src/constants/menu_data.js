import _ from "lodash";
import {
  HomeIcon, 
  LogoutIcon,  
  PopupIcon, 
  RewardIcon, 
  SystemAdminIcon,
 
} from "../assets/icons/svg_icons";
import paths from "../routes/paths";
import { ROLES } from "./index";
const menuData = [
  {
    id: "home",
    name: "Home",
    link: paths.home,
    icon: HomeIcon,
    roles: [ROLES.all],
    active: true,
  },
   
  {
    id: "separator1",
  },

  {
    id: "room",
    name: "Room",
    link: paths.room,
    icon: PopupIcon,
    roles: [ROLES.all],
    active: true,
  },
   
  {
    id: "separator2",
  },
  {
    id: "room_type",
    name: "Room Type",
    link: paths.room_type,
    icon: RewardIcon,
    roles: [ROLES.all],
    active: true,
  },

  {
    id: "separator3",
  },
  {
    id: "bookinh",
    name: "Booking ",
    link: paths.booking,
    icon: RewardIcon,
    roles: [ROLES.all],
    active: true,
  },

  {
    id: "logout",
    name: "Logout",
    icon: LogoutIcon,
    active: true,
    onSelect: () => {},
    roles: [ROLES.all],
  },
];

const filterMenuByRoles = (menu, roles) => {
  return menu.filter((item) => {
    if (item.roles) {
      const hasRole = item.roles.includes(ROLES.all) || item.roles?.some((role) => roles.includes(role));
      if (!hasRole) return false;
    }

    // If the item has children, recursively filter the children
    if (item.children) {
      item.children = filterMenuByRoles(item.children, roles);
    }

    return true;
  });
};

let filteredMenu = null;
const getMenu = (userRoles) => {
  console.log("User Roles", userRoles);
  if (!filteredMenu) {
    if (userRoles === undefined) {
      filteredMenu = _.cloneDeep(menuData);
    } else {
      const temp = filterMenuByRoles(menuData, userRoles);
      filteredMenu = _.cloneDeep(temp);
    }
  }
  console.log("Filtered Menu", filteredMenu);
  return filteredMenu;
};
const assignOnSelectFunction = (menuItem, onSelectFunction) => {
  const descriptor = Object.getOwnPropertyDescriptor(menuItem, "onSelect");
  if (descriptor && descriptor.writable) {
    menuItem.onSelect = onSelectFunction;
  } else {
    console.error("Cannot assign onSelect to a read-only property.");
  }
};

// Assuming you have a method to initialize the menu
const initializeMenu = (userRoles) => {
  const menu = getMenu(userRoles);
  menu.forEach((item) => {
    if (item.id === "logout") {
      assignOnSelectFunction(item, () => {
        console.log("Logout function triggered");
        // Your logout logic here
      });
    }
    if (item.children) {
      item.children.forEach((subItem) => {
        // Recursively set onSelect if needed
        if (subItem.id === "someChildId") {
          assignOnSelectFunction(subItem, () => {
            console.log("Child function triggered");
            // Your child logic here
          });
        }
      });
    }
  });
  return menu;
};

export { initializeMenu, getMenu };
