import { CheckCircle2, MapPin, Navigation } from "lucide-react";
import { useEffect, useState } from "react";

import { getStorageImageUrl } from "../../../../../../services/apiUrl";
import type {
  CampaignLocation,
  CurrentLocation,
} from "../../../types/masterCampaign";

type Props = {
  currentLocation: CurrentLocation;
  allLocations: CampaignLocation[];
  onChangeCurrentLocation: (locationId: number) => Promise<void>;
};

export default function LocationSection({
  currentLocation,
  allLocations,
  onChangeCurrentLocation,
}: Props) {
  const [currentLocationId, setCurrentLocationId] = useState(
    String(currentLocation.id ?? ""),
  );

  const [updated, setUpdated] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setCurrentLocationId(String(currentLocation.id ?? ""));
  }, [currentLocation]);

  const current =
    allLocations.find(
      (location) => String(location.id) === currentLocationId,
    ) ?? currentLocation;

  const currentImage = getStorageImageUrl(current.imagem ?? current.image);

  async function handleUpdate(locationId: number) {
    try {
      setIsUpdating(true);
      setError(null);

      await onChangeCurrentLocation(locationId);

      setCurrentLocationId(String(locationId));
      setUpdated(true);
      setTimeout(() => setUpdated(false), 2000);
    } catch {
      setError("Não foi possível atualizar a localização.");
    } finally {
      setIsUpdating(false);
    }
  }

  const otherLocations = allLocations.filter(
    (location) => String(location.id) !== currentLocationId,
  );

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-2xl border border-emerald-900/30 bg-slate-900/50">
        <div className="flex items-center gap-3 border-b border-emerald-900/25 bg-gradient-to-r from-emerald-900/30 to-teal-900/20 px-5 py-4">
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

        {currentImage && (
          <div className="h-64 border-b border-emerald-900/25 bg-slate-950">
            <img
              src={currentImage}
              alt={current.nome}
              className="h-full w-full object-cover"
            />
          </div>
        )}

        <div className="px-5 py-4">
          <p className="text-sm leading-relaxed text-amber-100/65">
            {current.descricao}
          </p>
        </div>
      </div>

      {error && <p className="text-sm text-rose-400">{error}</p>}

      <div className="rounded-xl border border-amber-900/20 bg-slate-900/40 p-4">
        <p className="mb-3 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-100/50">
          <MapPin className="h-3.5 w-3.5 text-amber-400" />
          Mover grupo para outra localização
        </p>

        <div className="grid gap-2 sm:grid-cols-2">
          {otherLocations.map((location) => (
            <button
              key={location.id ?? location.nome}
              disabled={isUpdating}
              onClick={() => handleUpdate(Number(location.id))}
              className="group flex items-start gap-3 rounded-xl border border-amber-900/20 bg-slate-900/60 px-4 py-3 text-left transition-all hover:border-amber-700/50 disabled:cursor-not-allowed disabled:opacity-60"
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
