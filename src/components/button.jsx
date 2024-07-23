import "./button.css";

/**
 * Button Component
 *
 * @param {React.PropsWithChildren<HTMLButtonElement>} props
 * @returns
 */
export function Button({ children, ...props }) {
  return (
    <button {...props} className={props.className + " " + "btn"}>
      {children}
    </button>
  );
}
