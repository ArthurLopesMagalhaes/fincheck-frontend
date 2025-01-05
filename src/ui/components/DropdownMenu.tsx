import * as RdxDropDownMenu from "@radix-ui/react-dropdown-menu";
import { ReactNode } from "react";
import { cn } from "../../app/utils/cn";

function DropdownMenuRoot({ children }: { children: ReactNode }) {
  return <RdxDropDownMenu.Root>{children}</RdxDropDownMenu.Root>;
}

function DropdownMenuTrigger({ children }: { children: ReactNode }) {
  return (
    <RdxDropDownMenu.Trigger className="outline-none" asChild>
      {children}
    </RdxDropDownMenu.Trigger>
  );
}

interface DropdownMenuContentProps {
  children: ReactNode;
  className?: string;
}
function DropdownMenuContent({
  children,
  className,
}: DropdownMenuContentProps) {
  return (
    <RdxDropDownMenu.Portal>
      <RdxDropDownMenu.Content
        className={cn(
          "p-2 bg-white rounded-2xl space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[70]",
          "data-[side=bottom]:animate-slide-down-and-fade",
          "data-[side=top]:animate-slide-up-and-fade",
          className
        )}
      >
        {children}
      </RdxDropDownMenu.Content>
    </RdxDropDownMenu.Portal>
  );
}

interface DropdownMenuItemProps {
  children: ReactNode;
  className?: string;
  onSelect?(): void;
}
function DropdownMenuItem({
  children,
  className,
  onSelect,
}: DropdownMenuItemProps) {
  return (
    <RdxDropDownMenu.Item
      onSelect={onSelect}
      className={cn(
        "min-h-12 outline-none flex items-center p-2 text-sm text-gray-800 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer",
        className
      )}
    >
      {children}
    </RdxDropDownMenu.Item>
  );
}

export const DropdownMenu = {
  Root: DropdownMenuRoot,
  Trigger: DropdownMenuTrigger,
  Content: DropdownMenuContent,
  Item: DropdownMenuItem,
};
