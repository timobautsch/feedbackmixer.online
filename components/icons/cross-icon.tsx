import React from "react";

function CrossIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="26"
      height="26"
      viewBox="0 0 26 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="26" height="26" fill="#454545" />
      <path d="M8 7L19 18M19 7L8 18" stroke="white" />
    </svg>
  );
}

export default CrossIcon;
