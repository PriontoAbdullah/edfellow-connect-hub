
import { Heart } from "lucide-react";

export function DashboardFooter() {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-700 mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-300">
              © 2024 Edfellow. All rights reserved.
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm text-slate-300">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500" />
            <span>for global education</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
