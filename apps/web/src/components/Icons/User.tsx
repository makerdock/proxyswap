import { ComponentProps } from "react";

export const User = (props: ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10.667 4.66667C10.667 6.13943 9.47308 7.33333 8.00033 7.33333C6.52757 7.33333 5.33366 6.13943 5.33366 4.66667C5.33366 3.19391 6.52757 2 8.00033 2C9.47308 2 10.667 3.19391 10.667 4.66667Z"
      stroke={props.fill}
      stroke-opacity="1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M11.3337 10H4.66699C3.56242 10 2.66699 10.8954 2.66699 12C2.66699 13.1046 3.56242 14 4.66699 14H11.3337C12.4382 14 13.3337 13.1046 13.3337 12C13.3337 10.8954 12.4382 10 11.3337 10Z"
      stroke={props.fill}
      stroke-opacity="1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
