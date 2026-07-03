import { CheckCircle2, MapPin, Navigation } from "lucide-react";
import { useState } from "react";

import type {
  CampaignLocation,
  CurrentLocation,
} from "../../../types/masterCampaign";

type Props = {
  currentLocation: CurrentLocation;
  allLocations: CampaignLocation[];
};

export default function LocationSection({
  currentLocation,
  allLocations,
}: Props) {
  const [currentLocationName, setCurrentLocationName] = useState(
    currentLocation.nome,
  );

  const [updated, setUpdated] = useState(false);

  const current = allLocations.find(
    (location) => location.nome === currentLocationName,
  ) ?? {
    nome: currentLocationName,
    tipo: currentLocation.tipo,
    descricao: currentLocation.descricao,
    regiao: "",
  };

  function handleUpdate(locationName: string) {
    setCurrentLocationName(locationName);
    setUpdated(true);

    setTimeout(() => setUpdated(false), 2000);
  }

  const otherLocations = allLocations.filter(
    (location) => location.nome !== currentLocationName,
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-emerald-900/30 bg-slate-900/50">
        <div
          className="
            flex
            items-center
            gap-3
            border-b
            border-emerald-900/25
            bg-gradient-to-r
            from-emerald-900/30
            to-teal-900/20
            px-5
            py-4
          "
        >
          <Navigation className="h-5 w-5 text-emerald-400" />

          <div>
            <p className="font-semibold text-amber-100">{current.nome}</p>

            <p className="text-xs text-amber-100/45">
              {current.tipo}
              {current.regiao ? ` · ${current.regiao}` : ""}
            </p>
          </div>

          {updated ? (
            <span className="ml-auto flex items-center gap-1 text-xs text-emerald-400">
              <CheckCircle2 className="h-3.5 w-3.5" />
              Atualizado
            </span>
          ) : (
            <span className="ml-auto rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs text-emerald-300">
              Localização Atual do Grupo
            </span>
          )}
        </div>

        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-amber-100/65">
            {current.descricao}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-amber-900/20 bg-slate-900/40 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/50">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          Mover grupo para outra localização
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {otherLocations.map((location) => (
            <button
              key={location.nome}
              onClick={() => handleUpdate(location.nome)}
              className="
                group
                flex
                items-start
                gap-3
                rounded-xl
                border
                border-amber-900/20
                bg-slate-900/60
                px-4
                py-3
                text-left
                transition-all
                hover:border-amber-700/50
              "
            >
              <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-400/60 transition group-hover:text-amber-400" />

              <div>
                <p className="text-sm text-amber-100/80 group-hover:text-amber-100">
                  {location.nome}
                </p>

                <p className="text-xs text-amber-100/35">{location.tipo}</p>
              </div>
            </button>
          ))}
        </div>

        {otherLocations.length === 0 && (
          <p className="py-2 text-center text-xs text-amber-100/30">
            Sem outras localizações cadastradas.
          </p>
        )}
      </div>
    </div>
  );
}
