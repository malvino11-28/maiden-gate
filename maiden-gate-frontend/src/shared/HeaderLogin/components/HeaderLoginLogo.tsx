import { Crown } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeaderLoginLogo() {
  return (
    <Link to="/" className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-rose-600 shadow-lg shadow-rose-950/40">
        <Crown size={22} className="text-white" />
      </div>

      <div>
        <h1 className="text-lg font-bold leading-none text-white">VOF</h1>
      </div>
    </Link>
  );
}
