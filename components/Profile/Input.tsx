import { useEffect, useRef, useState } from "react";
import { Edit } from "./Icons";
import s from "./profile.module.scss";

type Props = {
  isEdit?: boolean | undefined;
  isEdittext?: string | undefined;
  type?: React.HTMLInputTypeAttribute | undefined;
  placeholder?: string | undefined;
  name?: string | undefined;
  id?: string | undefined;
  children?: string | undefined;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined;
  onFocus?: React.FocusEventHandler<HTMLInputElement> | undefined;
  onClick?: () => void;
  value?: string | number | readonly string[] | undefined;
  pattern?: string;
  maxLength?: number;
};

const Input: React.FC<Props> = ({
  id,
  children,
  type,
  placeholder,
  name,
  onChange,
  value,
  isEdit,
  isEdittext,
  onClick,
  maxLength,
  pattern,
  onFocus,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const [isDisable, setIsDisable] = useState<boolean>(true);

  const handleClick = () => {
    setIsDisable(false);
    ref.current!.focus();
    if (onClick) onClick();
  };

  useEffect(() => {
    value === "" && setIsDisable(false);
  }, [value]);

  return (
    <div className={s.input}>
      {children && <label htmlFor={id}>{children}</label>}
      <div className={s.input_box}>
        <input
          ref={ref}
          data-edit={isEdit}
          id={id}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={isDisable}
          pattern={pattern}
          maxLength={maxLength}
          onFocus={onFocus}
        />

        {isEdit && (
          <button onClick={handleClick}>
            <Edit /> {isEdittext}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
