import React, { Dispatch } from "react";
import { useDispatch, useSelector } from "react-redux";
import { hideReminder } from "../store/actionCreators";
import styles from './Modal.module.css';

interface Props {
  children?: React.ReactNode
}

const Modal: React.FC<Props> = ({children}: Props) => {
	 const loading: boolean = useSelector(
    (state: CalendarState) => state.loading
  )
	 const showForm: boolean = useSelector(
    (state: CalendarState) => state.showForm
  )

  const dispatch: Dispatch<any> = useDispatch();

  const onHideForm = React.useCallback(
    () => !loading && dispatch(hideReminder()),
    [dispatch, loading]
  );

  return (showForm && <div className={styles.modal}>
		<div className={styles.background} onClick={() => onHideForm()}></div>
		<div className={styles.content}>
			{children}
			{ loading && <p className={styles.saving}>saving...</p> }
		</div>
	</div>) || <></>;
};

export default Modal;