import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface ChatModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ChatModal = ({ isOpen, onClose }: ChatModalProps) => {
  const [queryResponse, setQueryResponse] = useState<any>(null);

  const handleQueryResponse = (response: any) => {
    setQueryResponse(response);
    // Here you could also navigate to dashboard with the response data
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl h-[80vh] bg-gradient-ocean border-white/20">
        <DialogHeader className="border-b border-white/10 pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-white text-xl">FloatChat AI Assistant</DialogTitle>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:bg-white/10"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </DialogHeader>
        
        <div className="flex-1 min-h-0">
          <ChatInterface onQueryResponse={handleQueryResponse} />
        </div>
        
        {queryResponse && (
          <div className="border-t border-white/10 pt-4">
            <Button
              onClick={() => {
                // Navigate to dashboard with data
                window.location.href = '/dashboard';
              }}
              className="w-full bg-primary hover:bg-primary/90"
            >
              View Full Dashboard
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};