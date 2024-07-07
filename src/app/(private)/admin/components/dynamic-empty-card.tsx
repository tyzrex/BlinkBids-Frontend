import { CircleOff, ImageIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";

interface EmptyCardProps extends React.ComponentPropsWithoutRef<typeof Card> {
  title: string;
  description?: string;
  action?: React.ReactNode;
  icon?: React.ComponentType<{ className?: string }>;
}

export function GenericEmptyCard({
  title,
  description,
  icon: Icon = CircleOff,
  action,
  className,
  ...props
}: EmptyCardProps) {
  return (
    <Card
      className={cn(
        "flex w-max flex-col items-center justify-center space-y-6 bg-transparent p-5",
        className
      )}
      {...props}
    >
      <div className="mr-4 shrink-0 rounded-full border border-dashed p-4">
        <Icon className="size-6 text-muted-foreground" aria-hidden="true" />
      </div>
      <div className="flex flex-col items-center gap-1.5 text-center">
        <CardTitle className="md:text-lg">{title}</CardTitle>
        {description ? <CardDescription>{description}</CardDescription> : null}
      </div>
      {action ? action : null}
    </Card>
  );
}
