type TPasswordParams = {
  password: string,
  isValidPassword: boolean | undefined,
  setPasswordErrors: (errors: string[]) => void,
  setIsValidPassword: (value: boolean) => void,
  setPassword: (value: string) => void
}

function PasswordInput({
  password,
  isValidPassword,
  setPassword,
  setIsValidPassword,
  setPasswordErrors
}: TPasswordParams) {
  function handlePasswordChange(value: string) {
    setPassword(value)
    validatePassword(value)
  }

  function validatePassword(password: string) {
    const errors: string[] = [];

    // Check allowed characters only
    if (!/^[A-Za-z\d@$!%*?&]*$/.test(password)) {
      errors.push("Password contains invalid characters. Only letters, numbers, and @$!%*?& are allowed.");
    }

    // Length check (independent of content)
    if (password.length < 8 || password.length > 12) {
      errors.push("Password must be between 8 and 12 characters long.");
    }

    // Specific required components
    if (!/[a-z]/.test(password)) {
      errors.push("Include at least one lowercase letter.");
    }
    if (!/[A-Z]/.test(password)) {
      errors.push("Include at least one uppercase letter.");
    }
    if (!/\d/.test(password)) {
      errors.push("Include at least one digit.");
    }
    if (!/[@$!%*?&]/.test(password)) {
      errors.push("Include at least one special character: @$!%*?&");
    }
    
    if(errors.length === 0) {
      setIsValidPassword(true)
    } else {
      setIsValidPassword(false)
    }

    setPasswordErrors(errors);
  }

  return (
    <div className="flex flex-col">
      <input
        type="password"
        value={password}
        onChange={(e) => handlePasswordChange(e.target.value)}
        placeholder="****"
        className={`
          outline-none rounded-sm
          h-6
          pl-1 pr-1
           bg-gray-100
          inset-shadow-2xs
          overflow-hidden
          ring ring-gray-300
          ${ isValidPassword === false && "ring-red-500"}
        `}
      />
    </div>
  )
}

export default PasswordInput
