import { ShieldAlert } from "lucide-react";

export default function ErrorPage() {
  return (
    <div className="flex flex-col justify-center items-center h-full gap-2">
      <div>
        <ShieldAlert className="w-18 h-18"/>
      </div>
      <div className="text-center">
        <p className="text-xl mb-1">
          Error
        </p>
        <label>
          Could find the requested page
        </label>
        <p className="sm text-gray-500">
          404 Not Found...
        </p>
      </div>
    </div>
  );
};
