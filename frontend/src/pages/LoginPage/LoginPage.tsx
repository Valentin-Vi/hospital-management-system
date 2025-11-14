import { EmailInput, PasswordInput } from "@/components";
import { useAuth } from "@/security";
import { useState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  
  const { login } = useAuth();

  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  
  const [isValidEmail, setIsValidEmail] = useState<boolean | undefined>(undefined);
  const [isValidPassword, setIsValidPassword] = useState<boolean | undefined>(undefined);
  const [passwordErrors, setPasswordErrors] = useState<string[]>([])

  async function handleLogin() {
    if(isValidEmail && isValidPassword) {
      if((await login({ email, password })).ok) {
        navigate('/services/home')
      }
    }
  }

  return (
    <div className="inset-0 flex flex-col justify-center items-center h-full bg-slate-100">
      <div className="flex flex-col bg-white p-2 rounded-t-md rounded-r-md rounded-l-md w-80 min-h-auto max-h-80 shadow-lg">
        <div className="overflow-y-scroll p-1">
          <div className="mt-2 flex flex-col">
            <label className="text-xl">
              Email
            </label>
            <EmailInput
              email={email}
              setEmail={setEmail}
              displlayErrors={true}
              isValidEmail={isValidEmail}
              setIsValidEmail={setIsValidEmail}
            />
          </div>

          <div className="mt-2 flex flex-col">
            <label className="text-xl">
              Password
            </label>
            <PasswordInput
              password={password}
              setPassword={setPassword}
              setPasswordErrors={setPasswordErrors}
              isValidPassword={isValidPassword}
              setIsValidPassword={setIsValidPassword}
            />
          </div>
          {
            passwordErrors.length !== 0 &&
            <div className="pl-4 pr-2">
              <ul className="list-disc text-gray-500 text-sm">
                {
                  passwordErrors.map((value, index) => {
                    return (
                      <li className="" key={index}>
                        { value }
                      </li>
                    )
                  })
                }
              </ul>
            </div>
          }
        </div>
        <div className="flex flex-row justify-evenly mt-4 bg-white">
          <button 
            onClick={handleLogin}
            className={`
              text-white text-xl rounded-sm w-24 bg-blue-500 hover:bg-blue-600
            `}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
};