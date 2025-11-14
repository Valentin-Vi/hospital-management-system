type TEmailParams = {
  email: string,
  isValidEmail: boolean | undefined,
  displlayErrors: boolean,
  setIsValidEmail: (value: boolean) => void,
  setEmail: (value: string) => void
}

function EmailInput({ email, setEmail, isValidEmail, setIsValidEmail, displlayErrors }: TEmailParams) {

  const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/i;

  function handleEmailChange(value: string) {
    setEmail(value)
    setIsValidEmail(validateEmail(value))
  }

  function validateEmail(value: string): boolean {
    return emailRegex.test(value)  
  }

  return (
    <>
      <input
        type="email"
        value={email}
        onChange={(e) => handleEmailChange(e.target.value)}
        placeholder="example@mail.com"
        className={`
          outline-none rounded-sm
          pl-1 pr-1
          h-6
          bg-gray-100
          inset-shadow-2xs
          overflow-hidden
          ring ring-gray-300
          ${ isValidEmail === false && "ring-red-500"}
        `}/>
        {
          displlayErrors &&
          <div className="pl-4 pr-2">
            <ul className="list-disc text-gray-600 text-sm">
              { isValidEmail === false && <li>Invalid email</li> }
            </ul>
          </div>
        }
    </>
  )
}

export default EmailInput
