import React from 'react';

interface Props {
  className?: string;
}

const ChevronRight: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='7'
      height='10'
      viewBox='0 0 7 10'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
    >
      <path d='M1 1L5 5L1 9' stroke='#7C5DFA' strokeWidth='2' />
    </svg>
  );
};

export default ChevronRight;
