import { randomBetween } from "../shared/Math";
import * as actionTypes from "./actionTypes";

const API_KEY = process.env.REACT_APP_OPEN_WEATHER_API;
const API_URL = process.env.REACT_APP_OPEN_WEATHER_URL;
const API_ICON = process.env.REACT_APP_OPEN_WEATHER_ICON;

export function saveReminder(
  reminder: IReminder
): (dispatch: DispatchType) => Promise<void> {
  return async (dispatch: DispatchType) => {
    const saveAction: CalendarAction = {
      type: actionTypes.SAVE_REMINDER,
      reminder,
    };
    dispatch(saveAction);

    const coordsReq = await fetch(
      `${API_URL}geo/1.0/direct?q=${reminder.city}&limit=1&appid=${API_KEY}`
    );
    const coords = await coordsReq.json();

    if (coords.length > 0) {
      const weatherReq = await fetch(
        `${API_URL}data/2.5/onecall?lat=${coords[0].lat}&lon=${coords[0].lon}&exclude=current,minutely,hourly,alerts&appid=${API_KEY}`
      );
      const weather = await weatherReq.json();
      const day = randomBetween(0, weather.daily.length - 1);

      reminder.forecast = {
        description: weather.daily[day].weather[0].main,
        icon: `${API_ICON}img/wn/${weather.daily[day].weather[0].icon}.png`,
      };
    }
    const saveSuccessAction: CalendarAction = {
      type: actionTypes.SAVE_REMINDER_SUCCESS,
      reminder,
    };
    dispatch(saveSuccessAction);
  };
}

export function hideReminder(): (dispatch: DispatchType) => CalendarAction {
  const action: CalendarAction = {
    type: actionTypes.HIDE_REMINDER,
  };
  return (dispatch: DispatchType) => dispatch(action);
}

export function removeReminder(
  reminder: IReminder
): (dispatch: DispatchType) => CalendarAction {
  const action: CalendarAction = {
    type: actionTypes.REMOVE_REMINDER,
    reminder,
  };
  return (dispatch: DispatchType) => dispatch(action);
}
export function showReminder(
  reminder: IReminder
): (dispatch: DispatchType) => CalendarAction {
  const action: CalendarAction = {
    type: actionTypes.SHOW_REMINDER,
    reminder,
  };
  return (dispatch: DispatchType) => dispatch(action);
}

// export function removeReminder(reminder: IReminder) {
//   const action: ReminderAction = {
//     type: actionTypes.REMOVE_REMADD_REMINDER,
//     reminder,
//   };
//   return simulateHttpRequest(action);
// }
