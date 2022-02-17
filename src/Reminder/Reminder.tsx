import React from "react";
import { useSelector } from "react-redux";
import { formatTime } from "../shared/Date";
import styles from './Reminder.module.css';

type Props = {
  saveReminder: (reminder: IReminder | any) => void
}

export const Reminder: React.FC<Props> = ({ saveReminder }) => {
	 const currentReminder: IReminder = useSelector(
    (state: CalendarState) => state.currentReminder
  );
	
  const [reminder, setReminder] = React.useState<IReminder>(currentReminder);

  const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
    setReminder({
      ...reminder,
      [e.currentTarget.id]: e.currentTarget.value,
    })
  }

  const handleTime = (e: React.FormEvent<HTMLInputElement>) => {
		let time = e.currentTarget.value.split(':');
		const newDate = new Date(currentReminder.date);
		newDate.setHours(parseInt(time[0]));
		newDate.setMinutes(parseInt(time[1]));
    setReminder({
      ...reminder,
      date: newDate
    })
  }

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveReminder(reminder);
  }

  return (
    <form onSubmit={onSubmit} className={styles.reminder}>
			<label htmlFor="body">Reminder</label>
      <input
        type="text"
        id="body"
				className="w-full"
				maxLength={30}
				defaultValue={currentReminder.body}
				required
        onChange={handleInput}
      />

			<label htmlFor="city">City</label>
      <input
        type="text"
        id="city"
				className="w-full"
				defaultValue={currentReminder.city}
				required
        onChange={handleInput}
      />

			<label htmlFor="color">Color</label>
      <input
        type="color"
        id="color"
				defaultValue={currentReminder.color}
        onChange={handleInput}
      />

			<label htmlFor="time">Time</label>
      <input
        type="time"
        id="time"
				className="block"
				defaultValue={formatTime(reminder.date)}
				required
        onChange={handleTime}
      />
			
			<button className={styles.save}>
				Save reminder
			</button>
    </form>
  )
}

export default Reminder;
