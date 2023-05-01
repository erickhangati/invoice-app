import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
}

const ChevronDown: React.FC<Props> = ({ className, onClick }) => {
  return (
    <svg
      width='11'
      height='7'
      viewBox='0 0 11 7'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={onClick}
    >
      <path d='M1 1L5.2279 5.2279L9.4558 1' stroke='#7C5DFA' strokeWidth='2' />
    </svg>
  );
};

export default ChevronDown;
