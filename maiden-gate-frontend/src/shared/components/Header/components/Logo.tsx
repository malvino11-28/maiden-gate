import Flower2 from "../../../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link
      to="/"
      className="flex select-none items-center gap-3 transition-opacity hover:opacity-85"
    >
      {/* <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400 to-rose-600 shadow-lg shadow-amber-950/30"> */}
      <div className="flex h-10 w-14 items-center justify-center rounded-lg">
        <img src={Flower2} alt="" />
      </div>

      <div className="flex flex-col leading-tight">
        <span className="text-lg font-semibold text-amber-100">
          Voice Of Flower
        </span>
        <span className="text-xs text-amber-400/80">
          Awakening Of The Maiden
        </span>
      </div>
    </Link>
  );
}
