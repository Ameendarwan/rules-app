import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@app/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center font-mont justify-center gap-2 whitespace-nowrap rounded-md text-xs font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90 text-xs rounded !font-bold',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80 text-black',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        muted: 'bg-muted text-muted-foreground hover:bg-muted/90 !text-xss rounded text-blackShades-shade1 font-bold',
        success: 'bg-validations-upstream hover:bg-validations-upstream text-white',
      },
      size: {
        default: 'h-8 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
        icon: 'h-10 w-10',
        ghost: 'h-5 w-5',
        muted: 'px-2 py-1.5',
        custom: 'h-8 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp className={cn(buttonVariants({ variant, size, className }))} type="button" ref={ref} {...props}>
        {children}
      </Comp>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
