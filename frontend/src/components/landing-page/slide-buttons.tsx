import React from "react";

interface ButtonProps {
  id: number;
  text: string;
  link: string;
  type: string;
}

const SliderButtons: React.FC<{ buttons: ButtonProps[] }> = ({ buttons }) => {
  return (
    <>
      {buttons.map(({ id, link, text }) => (
        <a
          key={id}
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white font-medium text-sm sm:text-base hover:text-white/80 transition-colors duration-300"
        >
          {text}
        </a>
      ))}
    </>
  );
};

export default SliderButtons;
