import Flower from "../../../assets/images/logo.svg";
import { Link } from "react-router-dom";

export default function HeaderLoginLogo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-3 transition-opacity hover:opacity-85"
    >
      <div className="flex h-11 w-15 items-center justify-center rounded-xl">
        <img src={Flower} alt="Voice of Flower" />
      </div>

      <div>
        <h1 className="text-lg font-bold leading-none text-amber-400/80">
          VOF
        </h1>
      </div>
    </Link>
  );
}
