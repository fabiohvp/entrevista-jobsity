import * as actionTypes from "./actionTypes";
import { initialState } from "./store";

const reducer = (
  state: CalendarState = initialState,
  action: CalendarAction
): CalendarState => {
  switch (action.type) {
    case actionTypes.REMOVE_REMINDER:
      const updatedReminders: IReminder[] = state.reminders.filter(
        (reminder) => reminder.id !== action.reminder!.id
      );
      return {
        ...state,
        reminders: updatedReminders,
      };
    case actionTypes.REMOVE_REMINDER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_REMINDER:
      return {
        ...state,
        loading: true,
      };
    case actionTypes.SAVE_REMINDER_SUCCESS:
      let reminders = [...state.reminders];
      const reminder = action.reminder as IReminder;

      if (state.currentReminder.id === reminder.id) {
        reminders = reminders.filter((o) => o.id !== reminder.id);
      }
      reminder.id = state.counter + 1;
      reminders.push(reminder as IReminder);

      return {
        ...state,
        counter: state.counter + 1,
        currentReminder: {} as IReminder,
        reminders: reminders,
        showForm: false,
        loading: false,
      };
    case actionTypes.SHOW_REMINDER:
      return {
        ...state,
        currentReminder: action.reminder ?? ({} as IReminder),
        showForm: true,
      };
  }
  return state;
};

export default reducer;
