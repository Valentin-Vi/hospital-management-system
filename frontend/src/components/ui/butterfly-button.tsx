import { Button, buttonVariants } from "@/@models/components/ui/button"
import { ButtonGroup } from "@/@models/components/ui/button-group";
import { Trash2, X, type LucideProps } from "lucide-react";
import { useEffect, useRef, useState } from "react"

export type ButterflyButtonProps = {
  callback: () => void;
  ActionIcon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
  variant?: "link" | "default" | "destructive" | "outline" | "secondary" | "ghost" | "success" | null;
  callbackOnOpen?: () => void;
  callBackOnClose?: () => void;
}

export const ButterflyButton = ({
  callback,
  callbackOnOpen = undefined,
  callBackOnClose = undefined,
  ActionIcon = Trash2,
  variant = 'destructive'
}: ButterflyButtonProps) => {
  const [ isAskingConfirmation, askConfirmation ] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleAction = () => {
    askConfirmation(false);
    callback();
  }

  const close = () => {
    askConfirmation(false);
    callBackOnClose?.();
  }

  const open = () => {
    askConfirmation(true);
    callbackOnOpen?.();
  }

  if(isAskingConfirmation) {
    return (
      <ButtonGroup ref={ref}>
        <Button onClick={close}>
          <X />
        </Button>
        <Button variant={variant} onClick={handleAction}>
          <ActionIcon />
        </Button>
      </ButtonGroup >
    ) 
  }

  return (
    <Button size='icon' variant={variant} onClick={open}>
      <ActionIcon />
    </Button>
  )
}
