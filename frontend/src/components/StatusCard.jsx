import React from "react";

export const StatusCard = ({
  title,
  value,
  unit,
  variant = "primary",
  icon: Icon,
}) => {
  const variants = {
    primary: "bg-blue-50 border-blue-200",
    danger: "bg-red-50 border-red-200",
    success: "bg-green-50 border-green-200",
    warning: "bg-yellow-50 border-yellow-200",
  };

  const textVariants = {
    primary: "text-blue-900",
    danger: "text-red-900",
    success: "text-green-900",
    warning: "text-yellow-900",
  };

  const borderVariants = {
    primary: "border-l-4 border-blue-500",
    danger: "border-l-4 border-red-500",
    success: "border-l-4 border-green-500",
    warning: "border-l-4 border-yellow-500",
  };

  return (
    <div
      className={`${variants[variant]} ${borderVariants[variant]} p-6 rounded-lg`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-3xl font-bold mt-2 ${textVariants[variant]}`}>
            {value}
            <span className="text-lg ml-1">{unit}</span>
          </p>
        </div>
        {Icon && (
          <div className={`text-4xl ${textVariants[variant]}`}>
            <Icon />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatusCard;
