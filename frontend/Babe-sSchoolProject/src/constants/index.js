import allConsts from "./constants.js";
export const persistant_store_name = "tgms.admin";

export const axiosConfig = {
  headers: {
    "Content-Type": "application/json",
    charset: "utf8",
    Key: "2488fb9228ce529eb933674d135b561f13cff704",
  },
};



export const ROLES = {
  superadmin: "_admin",
  admin: "admin",
  manager: "manager",
  supervisor: "supervisor",
  cashier: "cashier",
  operator: "operator",
  all: "all",
};

export const userRoles = [
  { label: "Admin", value: ROLES.admin, level: 1 },
  { label: "Manager", value: ROLES.manager, level: 2 },
  { label: "Supervisor", value: ROLES.supervisor, level: 3 },
  { label: "Cashier", value: ROLES.cashier, level: 3 },
  { label: "Operator", value: ROLES.operator, level: 3 },
];



//reward
export const rewards_url = "/getRewards";
export const reward_by_id_url = "/getRewardById";
export const upsert_reward_url = "/upsertReward";

//popup
export const popups_url = "/getPopups";
export const popup_by_id_url = "/getPopupById";
export const upsert_popup_url = "/upsertPopup";

//reward & popup
export const rewards_popups_url = "/getRewardsAndPopups";
;

//signin
export const signin_url = "/signinSystemUser";


