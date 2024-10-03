export const Collapse = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M18.8078 7.54246L16.3333 5.06796V11.6666H22.932L20.4575 9.19213L24.1581 5.49146L22.5085 3.8418L18.8078 7.54246ZM5.49146 3.8418L3.8418 5.49146L7.54246 9.19213L5.06796 11.6666H11.6666V5.06796L9.19213 7.54246L5.49146 3.8418ZM22.932 16.3333H16.3333V22.932L18.8078 20.4575L22.5085 24.1581L24.1581 22.5085L20.4575 18.8078L22.932 16.3333ZM7.54246 18.8078L3.8418 22.5085L5.49146 24.1581L9.19213 20.4575L11.6666 22.932V16.3333H5.06796L7.54246 18.8078Z"
        fill="black"
      />
    </svg>
  );
};

export const VerticalArrow = () => {
  return (
    <svg
      data-responsive
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        //   0.2
        opacity="1"
        d="M8 6L9.414 7.414L13 3.828V24.172L9.414 20.586L8 22L14 28L20 22L18.586 20.586L15 24.172V3.828L18.586 7.414L20 6L14 0L8 6Z"
        fill="black"
      />
    </svg>
  );
};

export const HorizontalArrow = () => {
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        opacity="1"
        d="M22 8L20.586 9.414L24.172 13L3.828 13L7.414 9.414L6 8L-2.62268e-07 14L6 20L7.414 18.586L3.828 15L24.172 15L20.586 18.586L22 20L28 14L22 8Z"
        fill="black"
      />
    </svg>
  );
};

export const Circle: React.FC<{ hexcode: string }> = ({ hexcode }) => {
  return (
    <svg
      data-responsive
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect
        opacity="1"
        x="1.5"
        y="1.5"
        width="25"
        height="25"
        rx="12.5"
        stroke="black"
        strokeWidth="3"
      />
      <rect
        x="6.16113"
        y="6.16113"
        width="15.6777"
        height="15.6777"
        rx="7.83884"
        fill={hexcode}
      />
    </svg>
  );
};

export const Upload = () => {
  return (
    <svg
      data-responsive
      viewBox="0 0 28 28"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M5.8335 23.3333H22.1668V21H5.8335V23.3333ZM5.8335 11.6667H10.5002V18.6667H17.5002V11.6667H22.1668L14.0002 3.5L5.8335 11.6667Z"
        fill="black"
      />
    </svg>
  );
};

export const Delete = () => {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.0397 1.44H11.1997C11.1117 1.44 11.0397 1.368 11.0397 1.28V1.44ZM11.0397 1.44H4.95969V1.28C4.95969 1.368 4.88769 1.44 4.79969 1.44H4.95969V2.88H3.51969V1.28C3.51969 0.574 4.09369 0 4.79969 0H11.1997C11.9057 0 12.4797 0.574 12.4797 1.28V2.88H11.0397V1.44ZM0.959688 2.88H15.0397C15.3937 2.88 15.6797 3.166 15.6797 3.52V4.16C15.6797 4.248 15.6077 4.32 15.5197 4.32H14.3117L13.8177 14.78C13.7857 15.462 13.2217 16 12.5397 16H3.45969C2.77569 16 2.21369 15.464 2.18169 14.78L1.68769 4.32H0.479688C0.391687 4.32 0.319688 4.248 0.319688 4.16V3.52C0.319688 3.166 0.605688 2.88 0.959688 2.88ZM3.61369 14.56H12.3857L12.8697 4.32H3.12969L3.61369 14.56Z"
        fill="black"
      />
    </svg>
  );
};

export const Move = () => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M12 3L10 1M10 1L8 3M10 1V19M10 19L12 17M10 19L8 17M17 12L19 10M19 10L17 8M19 10H1M1 10L3 12M1 10L3 8"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
