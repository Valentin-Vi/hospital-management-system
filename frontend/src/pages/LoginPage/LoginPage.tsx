import { useAuth } from "@/security";
import { useState } from "react";
import { useNavigate } from "react-router";
import { Input } from "@/@models/components/ui/input"
import { Label } from "@/@models/components/ui/label";
import { Card } from "@/@models/components/ui/card";
import { Button } from "@/@models/components/ui/button";
import { useQuery } from "@tanstack/react-query";

export default function LoginPage() {
  
  const { login } = useAuth();

  const nav = useNavigate();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  

  const { data, refetch, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: async () => (await login({ email, password })).ok
  })

  const onEmailChange = (value: string) => {
    setEmail(value)
  }

  const onPasswordChange = (value: string) => {
    setPassword(value)
  }

  const onClickLogin = () => {
    if(isLoading) return;
    refetch()
    
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <Card className="flex flex-col w-64 p-4 gap-2">
        <div className="flex flex-col gap-2">
          <Label>Email</Label>
          <Input type="email" value={email} onChange={(e) => onEmailChange(e.target.value)} placeholder="example@provider.com"/>
        </div>
        <div className="flex flex-col gap-2">
          <Label>Password</Label>
          <Input type="password" value={password} onChange={(e) => onPasswordChange(e.target.value)} placeholder="*****"/>
        </div>
        <div className="flex justify-center items-center">
          <Button onClick={onClickLogin}>
            Login
          </Button>
        </div>
      </Card>
    </div>
  )
};