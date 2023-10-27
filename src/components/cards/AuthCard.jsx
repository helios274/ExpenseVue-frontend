import React from "react";

const AuthCard = ({ title, children, cardClass, titleClass }) => {
  return (
    <div
      className={`${cardClass}flex flex-col w-[36rem] p-3 md:p-5 bg-secondary dark:bg-tertiary rounded-md`}
    >
      <h1 className="my-1 text-center text-2xl sm:text-3xl font-bold text-quaternary dark:text-primary">
        {title}
      </h1>
      {children}
    </div>
  );
};

export default AuthCard;
