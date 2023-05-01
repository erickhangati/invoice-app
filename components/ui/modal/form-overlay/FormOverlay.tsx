import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import styles from './FormOverlay.module.scss';

interface Props {
  children: ReactNode;
}

const FormOverlay: React.FC<Props> = ({ children }) => {
  return (
    <motion.div
      key={Math.random()}
      className={styles.overlay}
      initial={{ x: '-100%' }}
      animate={{ x: 0 }}
      transition={{ duration: 0.7 }}
      exit={{ x: '-100%', transition: { duration: 0.7 } }}
    >
      {children}
    </motion.div>
  );
};

export default FormOverlay;
