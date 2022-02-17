import React, { useEffect, useState } from 'react';
import {  Dispatch } from "redux"
import { useDispatch, useSelector } from "react-redux"

import styles from './Calendar.module.css';
import Container from '../Container/Container';
import Day from '../Day/Day';
import Header from '../Header/Header';
import { addRemindersToCells, generateCurrentDates, generateNextDates, generatePreviousDates } from '../shared/Cell';
import Reminder from '../Reminder/Reminder';
import Modal from '../Modal/Modal';
import { saveReminder } from '../store/actionCreators';
import { formatMonthTitle } from '../shared/Date';

//const currentDate = new Date(2022,0,1);
const currentDate = new Date();
//const currentDate = new Date(2022,2,1);

interface Props {
  date?: Date;
}

const Calendar: React.FC<Props> = (props: Props) => {
	 const reminders: IReminder[] = useSelector(
    (state: CalendarState) => state.reminders
  );

	const [cells, setCells] = useState<ICell[]>([]);
	const [date, setDate] = useState(props.date ?? new Date());
	
	useEffect(() => {
		let _cells: ICell[] = generatePreviousDates(date!);
		_cells = _cells.concat(generateCurrentDates(date!));
		_cells = _cells.concat(generateNextDates(date!));
		addRemindersToCells(_cells, reminders);
		setCells(_cells);
	}, [date, reminders]);
	
	// useEffect(() => {
	// 	setCells(cells => addRemindersToCells(cells, reminders));
	// }, );
	
  const dispatch: Dispatch<any> = useDispatch();

	function onNextMonth(){
		const newDate = new Date(date);
		newDate.setMonth(newDate.getMonth() + 1)
		setDate(newDate);
	}

	function onPreviousMonth(){
		const newDate = new Date(date);
		newDate.setMonth(newDate.getMonth() - 1)
		setDate(newDate);
	}

  const onSaveReminder = React.useCallback(
    (reminder: IReminder) => dispatch(saveReminder(reminder)),
    [dispatch]
  );

  return (
		<>
			<div className={styles.calendar}>
				<div className={styles.title}>{formatMonthTitle(date)}</div>
				<button className={styles.previousMonth} onClick={onPreviousMonth}> &lt; </button>
				<Container key="header">
					<Header text="Sunday" />
					<Header text="Monday" />
					<Header text="Tuesday" />
					<Header text="Wednesday" />
					<Header text="Thursday" />
					<Header text="Friday" />			
					<Header text="Saturday" />
				</Container>
				<button className={styles.nextMonth} onClick={onNextMonth}> &gt; </button>
				<Container key="days">
				{
					cells.map((cell, i) => 
						<Day key={i} cell={cell} />
					)
				}
				</Container>
			</div>
			<Modal>
				<Reminder saveReminder={onSaveReminder} ></Reminder>
			</Modal>
		</>
	);
}

export default Calendar;