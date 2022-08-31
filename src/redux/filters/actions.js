import { STATUSCHANGED, COLORCHANGED } from "./actionTypes";

export const statusChanged = (status) => {
  // status - filter value, with which we will filter. all / completed / incompleted.
  return {
    type: STATUSCHANGED,
    payload: status,
  };
};
export const colorChanged = (color, changeType) => {
  // color - all the tasks with that color
  // changeType - if I am selecting that color or desecting / removing that color
  return {
    type: COLORCHANGED,
    payload: {
      color,
      changeType,
    }
  };
};
