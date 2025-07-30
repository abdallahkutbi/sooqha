import { Button } from "@/components/tiptap-ui-primitive/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/tiptap-ui-primitive/dropdown-menu";
import { ChevronDownIcon } from "@/components/tiptap-icons/chevron-down-icon";
import { ExportIcon } from "@/components/tiptap-icons/export-icon";

export function ExportButton() {
  const handleExport = (format: string) => {
    // Your export logic here
    console.log(`Exporting as ${format}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button data-style="ghost">
          <ExportIcon className="mr-2 h-4 w-4" />
          <ChevronDownIcon className="ml-1 h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={() => handleExport('pdf')}>
          Export as PDF
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('docx')}>
          Export as Word
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('html')}>
          Export as HTML
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleExport('markdown')}>
          Export as Markdown
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
