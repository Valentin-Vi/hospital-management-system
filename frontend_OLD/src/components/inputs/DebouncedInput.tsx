import { useEffect, useState } from "react";

const inputTypes = {
  button: 'button',
  checkbox: 'checkbox',
  color: 'color',
  date: 'date',
  datetimeLocal: 'datetime-local',
  email: 'email',
  file: 'file',
  hidden: 'hidden',
  image: 'image',
  month: 'month',
  number: 'number',
  password: 'password',
  radio: 'radio',
  range: 'range',
  reset: 'reset',
  search: 'search',
  submit: 'submit',
  tel: 'tel',
  text: 'text',
  time: 'time',
  url: 'url',
  week: 'week'
} as const;

export type DebouncedInputProps = {
  value: string;
  setValue: (value: string) => void;
  type: (typeof inputTypes)[keyof typeof inputTypes];
  delay?: number;
  placeholder?: string;
};

export default function DebouncedInput({
  value,
  setValue,
  type = 'text',
  delay = 300,
  placeholder = ''
}: DebouncedInputProps) {
  const [tempValue, setTempValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setValue(tempValue);
    }, delay);

    return () => clearTimeout(handler);
  }, [tempValue, delay, setValue]);

  return (
    <input
      type={type}
      value={tempValue}
      placeholder={placeholder}
      onChange={(e) => setTempValue(e.target.value)}
      className="border rounded p-1"
    />
  );
}
