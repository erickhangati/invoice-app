import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
}

const ChevronLeft: React.FC<Props> = ({ className, onClick }) => {
  return (
    <svg
      width='11'
      height='11'
      viewBox='0 0 11 11'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      onClick={onClick}
    >
      <svg width='7' height='10' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M6.342.886L2.114 5.114l4.228 4.228'
          stroke='#9277FF'
          strokeWidth='2'
          fill='none'
          fillRule='evenodd'
        />
      </svg>
    </svg>
  );
};

export default ChevronLeft;
