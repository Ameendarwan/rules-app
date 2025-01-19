import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@app/components/Dialog/Dialog';
import { ReactNode, useState } from 'react';

import { Button } from '@app/components/Button/Button';
import { DialogTitle } from '@radix-ui/react-dialog';

interface ConfirmationDialogProps {
  title?: string;
  triggerComponent: ReactNode;
  description: string;
  confirmationComponent: ReactNode;
  disabled?: boolean;
}

const ConfirmationDialog = ({
  description,
  triggerComponent,
  confirmationComponent,
  title = '',
  disabled,
}: ConfirmationDialogProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleConfirm = () => {
    setIsLoading(true);
  };
  return (
    <Dialog>
      {!disabled && <DialogTrigger asChild>{triggerComponent}</DialogTrigger>}
      <DialogContent className="!rounded-[12px] font-mont sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-md font-bold">{title}</DialogTitle>
          <DialogDescription className="text-text text-sm">{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="pt-6 sm:justify-between">
          <div className="flex w-full flex-row justify-between">
            <DialogClose asChild>
              <Button type="button" variant="link">
                Cancel
              </Button>
            </DialogClose>
            <DialogClose onClick={handleConfirm} disabled={disabled || isLoading} asChild>
              {confirmationComponent}
            </DialogClose>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmationDialog;
