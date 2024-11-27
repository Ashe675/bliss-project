// src/app/components/MenuButton.tsx
'use client';
const MenuButton = ({ onClick }: { onClick: () => void }) => {
    return (
      <button onClick={onClick} className="text-white ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-9 w-9"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>
    );
  };
  
  export default MenuButton;
  