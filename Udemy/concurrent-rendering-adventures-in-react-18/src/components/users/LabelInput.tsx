// @ts-ignore
import { InputHTMLAttributes, useId } from 'react';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  value: string;
}

export function LabelInput({ label, value, ...rest }: Props) {
  const inputId = useId();
  return (
    <div className="mb-3">
      <label htmlFor={inputId} className="form-label">{label}</label>
      <input id={inputId} className="form-control" value={value} {...rest} />
    </div>
  );
}
