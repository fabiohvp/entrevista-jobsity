import React, { Dispatch } from "react";
import { useDispatch } from "react-redux";
import { getContrastYIQ } from "../shared/Color";
import { formatTime } from "../shared/Date";
import { removeReminder, showReminder } from "../store/actionCreators";
import styles from './Day.module.css';

const DEFAULT_COLOR = '#000';

const Day: React.FC<{cell: ICell }> = ({cell: { date, disabled, reminders }}) => {	
  const dispatch: Dispatch<any> = useDispatch();

  const onShowForm = 
    (e: any, reminder?: IReminder) => {
			e.stopPropagation();
			return dispatch(showReminder(reminder ?? { date, color: DEFAULT_COLOR } as IReminder));
		}

  const onRemove = (e: React.FormEvent, reminder: IReminder) => {
		e.stopPropagation();
		return dispatch(removeReminder(reminder));
  }

  return <span className={`${styles.day} ${disabled ? styles.disabled : ""}`} onClick={(e) => onShowForm(e)}>
			<div className={styles.number}>{date.getDate()}</div>			
			<div className={styles.container}>
				<div className={styles.items}>
					{
						reminders.map((reminder, i) => 
							<div key={i} className={styles.itemContainer}>								
								<button className={styles.remove} onClick={(e) => onRemove(e, reminder)}>
									&times;
								</button>
								<div className={styles.item} style={{backgroundColor: reminder.color, color: getContrastYIQ(reminder.color)}}
								onClick={(e) => onShowForm(e, reminder)}>
									<div className={styles.left}>
											{reminder.forecast && <span className={styles.forecast}><img src={reminder.forecast.icon} alt={reminder.forecast.description} title={reminder.forecast.description} /></span>}
											<span className={styles.time}>{formatTime(reminder.date)}</span>
									</div>
									<div className={styles.body}>{reminder.body}</div>
								</div>
							</div>
						)
					}
				</div>
			</div>
		</span>
}

export default Day;