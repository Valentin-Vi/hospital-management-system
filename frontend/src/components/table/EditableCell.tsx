import { useEffect, useState } from "react"

function EditableCell({
  getValue
} : {
  getValue: () => any
}) {
  const initValue = getValue();
  const [value, setValue] = useState<any>(initValue);

  useEffect(() => setValue(initValue), [initValue]);

  return (
    <input
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}

export default EditableCell
