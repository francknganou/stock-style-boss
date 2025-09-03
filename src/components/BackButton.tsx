import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => navigate(-1)}
      className="absolute left-6 top-6 z-50 bg-background/80 backdrop-blur-sm border shadow-sm hover:shadow-md"
    >
      <ArrowLeft className="h-4 w-4" />
    </Button>
  );
};

export default BackButton;