import { Button } from "@/@models/components/ui/button"
import { ButtonGroup } from "@/@models/components/ui/button-group";
import { Trash2, X } from "lucide-react";
import { useState } from "react"

export type DeleteButtonProps = {
  callback: () => void
};

export const DeleteButton = ({
  callback
}: DeleteButtonProps) => {
  const [ isAskingConfirmation, askConfirmation ] = useState<boolean>(false);

  const handleDeletion = () => {
    askConfirmation(false);
    callback();
  }
  
  if(isAskingConfirmation) {
    return (
      <ButtonGroup >
        <Button onClick={() => askConfirmation(false)}>
          <X />
        </Button>
        <Button variant='destructive' onClick={handleDeletion}>
          <Trash2 />
        </Button>
      </ButtonGroup >
    ) 
  }

  return (
    <Button size='icon' variant='destructive' onClick={() => askConfirmation(prev => !prev)}>
      <Trash2 />
    </Button>
  )
}
