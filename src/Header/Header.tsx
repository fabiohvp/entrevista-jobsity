import React from "react";
import styles from './Header.module.css';

interface Props {
  text: string;
}

const Header: React.FC<Props> = ({text}: Props) => {
  return <div className={styles.header}>{text}</div>;
};

export default Header;