import { Button } from "@/components/tiptap-ui-primitive/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/tiptap-ui-primitive/dropdown-menu";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";

const PAGE_SIZES = [
  { name: "A4", size: "a4", label: "A4" },
  { name: "Letter", size: "letter", label: "Letter" },
  { name: "Legal", size: "legal", label: "Legal" },
  { name: "Custom", size: "custom", label: "Custom" },
];

interface PageSizeButtonProps {
  currentSize: string;
  onSizeChange: (size: string) => void;
}

export function PageSizeButton({ currentSize, onSizeChange }: PageSizeButtonProps) {
  const currentPageSize = PAGE_SIZES.find(size => size.size === currentSize) || PAGE_SIZES[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-style="ghost">
          {currentPageSize.label}
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {PAGE_SIZES.map((size) => (
          <DropdownMenuItem 
            key={size.size}
            onClick={() => onSizeChange(size.size)}
          >
            {size.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
