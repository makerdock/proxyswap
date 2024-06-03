import { ComponentProps } from "react";

export const Market = (props: ComponentProps<"svg">) => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14 14H4.66667C3.19391 14 2 12.8061 2 11.3333V2M4.66667 9.33333L5.07351 8.11281C5.57019 6.62275 7.68637 6.64736 8.14827 8.14856C8.57662 9.54069 10.4841 9.69855 11.1354 8.39578L12.6667 5.33333"
      stroke={props.fill}
      stroke-opacity="1"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);
