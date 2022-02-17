interface IReminder {
  id: number;
  body: string;
  city: string;
  color: string;
  date: Date;
  forecast: {
    description: string;
    icon: string;
  };
}

type CalendarState = {
  counter: number;
  loading: boolean;
  currentReminder: IReminder;
  reminders: IReminder[];
  showForm: boolean;
};

type CalendarAction = {
  type: string;
  reminder?: IReminder;
};

type DispatchType = (args: CalendarAction) => CalendarAction;
