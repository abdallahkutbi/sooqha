import { FileExplorer } from "./components/FileExplorer";

export default function App() {
  const handleFileSelect = (node: any) => {
    console.log('Selected:', node);
  };

  const handleFileMove = (draggedId: string, targetId: string) => {
    console.log(`Moved ${draggedId} to ${targetId}`);
  };

  return (
    <div className="size-full flex items-center justify-center p-8 bg-[#11212D]">
      <FileExplorer 
        onSelect={handleFileSelect} 
        onMove={handleFileMove}
      />
    </div>
  );
}