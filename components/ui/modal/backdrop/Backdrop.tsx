import React from 'react';
import { motion } from 'framer-motion';
import styles from './Backdrop.module.scss';

interface Props {
  className?: string;
  formModalHandler?: () => void;
  deleteModalHandler?: () => void;
}

const Backdrop: React.FC<Props> = ({ formModalHandler, className }) => {
  const classes = `${styles.backdrop}${className ? ` ${className}` : ''}`;
  return (
    <motion.div
      key={Math.random()}
      className={classes}
      onClick={formModalHandler}
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0, transition: { duration: 0.7 } }}
    ></motion.div>
  );
};

export default Backdrop;
