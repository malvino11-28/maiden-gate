import vofamLogo from "../../../../assets/images/logo.png";

export default function logo() {
  return (
    <a
      href="/"
      className="
                flex 
                items-center
                gap-4
                select-none
            "
    >
      <img
        src={vofamLogo}
        alt="Voice Of Flower logo"
        className="
                    h-14
                    w-14
                    rounded-xl
                    object-cover
                "
      />

      <div className="leading-tight">
        <h1
          className="
                        text-xl
                        font-bold
                        text-stone-100
                    "
        >
          Voice Of Flower
        </h1>

        <p
          className="
                text-sm
                text-amber-400
            "
        >
          Awakening Of The Maiden
        </p>
      </div>
    </a>
  );
}
