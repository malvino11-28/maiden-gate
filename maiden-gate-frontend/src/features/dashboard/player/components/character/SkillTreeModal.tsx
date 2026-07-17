/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  Lock,
  Save,
  Unlock,
  Wand2,
  X,
} from "lucide-react";

import {
  getAllSkills,
  getInitialEquippedSkills,
  getMarkMeta,
  getSkillTreeByMark,
  MAX_EQUIPPED_SKILLS,
  skillBranches,
} from "../../data/skillTreeMock";
import { getSkillsByMark } from "../../../services/characterCreationService";

import type {
  CharacterSkill,
  SkillBranchKey,
  SkillTree,
} from "../../data/skillTreeMock";

type Props = {
  mark: string;
  markId?: number;
  campaignId?: number | null;
  level: number;
  characterName: string;
  campaign?: string;
  equippedSkillIds?: string[];
  onSaveEquippedSkills?: (skillIds: string[]) => void;
  onClose: () => void;
};

export default function SkillTreeModal({
  mark,
  markId,
  campaignId,
  level,
  characterName,
  campaign,
  equippedSkillIds,
  onSaveEquippedSkills,
  onClose,
}: Props) {
  const meta = getMarkMeta(mark);

  const [tree, setTree] = useState<SkillTree>(() => getSkillTreeByMark(mark));
  const [branch, setBranch] = useState<SkillBranchKey>("ofensivo");
  const [showCampaignSkills, setShowCampaignSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);
  const [isLoadingSkills, setIsLoadingSkills] = useState(false);
  const [skillsError, setSkillsError] = useState<string | null>(null);
  const [showMobileTypes, setShowMobileTypes] = useState(false);

  const initialEquipped = equippedSkillIds ?? getInitialEquippedSkills(tree);

  const [equippedSkills, setEquippedSkills] =
    useState<string[]>(initialEquipped);

  const [savedEquippedSkills, setSavedEquippedSkills] =
    useState<string[]>(initialEquipped);

  useEffect(() => {
    let active = true;

    setTree(getSkillTreeByMark(mark));
    setBranch("ofensivo");
    setShowCampaignSkills(false);
    setShowMobileTypes(false);

    if (!markId) {
      setSkillsError(null);
      setIsLoadingSkills(false);
      return;
    }

    const currentMarkId = markId;

    async function loadSkills() {
      try {
        setIsLoadingSkills(true);
        setSkillsError(null);

        const data = await getSkillsByMark(currentMarkId, campaignId);

        if (active) {
          setTree(data);
        }
      } catch {
        if (active) {
          setSkillsError(
            "Não foi possível carregar as habilidades desta Marca.",
          );
        }
      } finally {
        if (active) {
          setIsLoadingSkills(false);
        }
      }
    }

    loadSkills();

    return () => {
      active = false;
    };
  }, [mark, markId, campaignId]);

  useEffect(() => {
    const nextEquipped =
      equippedSkillIds ?? (markId ? [] : getInitialEquippedSkills(tree));
    setEquippedSkills(nextEquipped);
    setSavedEquippedSkills(nextEquipped);
  }, [tree, equippedSkillIds, markId]);

  const changed =
    JSON.stringify(equippedSkills) !== JSON.stringify(savedEquippedSkills);

  const activeSkills = showCampaignSkills
    ? tree.campanha
    : (tree[branch] ?? []);

  const activeFilterLabel = showCampaignSkills
    ? "Skills da Campanha"
    : (skillBranches.find((item) => item.key === branch)?.label ??
      "Habilidades");

  function hasRequiredLevel(skill: CharacterSkill) {
    return level >= skill.nivel;
  }

  function toggleEquip(skillId: string) {
    setEquippedSkills((previous) => {
      if (previous.includes(skillId)) {
        return previous.filter((id) => id !== skillId);
      }

      if (previous.length >= MAX_EQUIPPED_SKILLS) {
        return previous;
      }

      return [...previous, skillId];
    });
  }

  function saveEquippedSkills() {
    setSavedEquippedSkills([...equippedSkills]);
    onSaveEquippedSkills?.([...equippedSkills]);
  }

  function selectBranch(nextBranch: SkillBranchKey) {
    setBranch(nextBranch);
    setShowCampaignSkills(false);
    setShowMobileTypes(false);
  }

  function selectCampaignSkills() {
    setShowCampaignSkills(true);
    setShowMobileTypes(false);
  }

  const filters = (
    <>
      {skillBranches.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={() => selectBranch(key)}
          className={`
            flex
            items-center
            gap-1.5
            rounded-lg
            px-3
            py-1.5
            text-xs
            font-medium
            transition-all

            ${
              !showCampaignSkills && branch === key
                ? key === "penalidade"
                  ? "border border-rose-500/40 bg-rose-500/20 text-rose-300"
                  : "border border-amber-500/30 bg-amber-500/15 text-amber-200"
                : "text-amber-100/40 hover:bg-slate-800/60 hover:text-amber-100/70"
            }
          `}
        >
          <Icon className="h-3 w-3" />
          {label}
        </button>
      ))}

      {campaign && (
        <button
          type="button"
          onClick={selectCampaignSkills}
          className={`
            flex
            items-center
            gap-1.5
            rounded-lg
            border
            px-3
            py-1.5
            text-xs
            font-medium
            transition-all
            lg:ml-auto

            ${
              showCampaignSkills
                ? "border-violet-500/40 bg-violet-500/20 text-violet-300"
                : "border-violet-900/30 text-violet-400/50 hover:border-violet-700/50 hover:text-violet-300/80"
            }
          `}
        >
          <BookOpen className="h-3 w-3" />
          Skills da Campanha
        </button>
      )}
    </>
  );

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4"
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="absolute inset-0 bg-black/75 backdrop-blur-sm" />

      <div
        className="
          relative
          flex
          h-[94vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-amber-900/40
          bg-slate-950
          shadow-2xl
          sm:h-[92vh]
        "
      >
        <header
          className="
            flex
            flex-shrink-0
            items-start
            justify-between
            gap-3
            border-b
            border-amber-900/30
            px-4
            py-4
            sm:px-6
            sm:py-5
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(30,20,5,0.9) 0%, rgba(15,15,25,0.9) 100%)",
          }}
        >
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <div
              className={`
                flex
                h-10
                w-10
                flex-shrink-0
                items-center
                justify-center
                overflow-hidden
                rounded-xl
                border
                bg-gradient-to-br
                shadow-lg
                sm:h-12
                sm:w-12
                ${meta.gradient}
                ${meta.active.split(" ")[0]}
              `}
            >
              {meta.image ? (
                <img
                  src={meta.image}
                  alt={`Marca ${mark}`}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className={`text-lg font-bold ${meta.text}`}>
                  {mark.charAt(0)}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="truncate text-base font-bold text-amber-100 sm:text-lg">
                  Árvore de Habilidades
                </h2>

                <span
                  className={`
                    rounded-full
                    border
                    px-2
                    py-0.5
                    text-[10px]
                    sm:text-xs
                    ${meta.active}
                    ${meta.text}
                  `}
                >
                  Marca {mark}
                </span>
              </div>

              <p className="mt-0.5 truncate text-xs text-amber-100/40">
                {characterName} · Nível {level}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-8
              w-8
              flex-shrink-0
              items-center
              justify-center
              rounded-lg
              text-amber-100/40
              transition
              hover:bg-amber-900/30
              hover:text-amber-100
            "
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <section className="flex-shrink-0 border-b border-amber-900/20 bg-slate-900/60 px-3 py-3 sm:px-6 sm:py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-600/60">
                  Equipadas
                </span>

                <span className="text-[10px] text-amber-100/30 sm:hidden">
                  {equippedSkills.length}/{MAX_EQUIPPED_SKILLS}
                </span>
              </div>

              <div className="grid grid-cols-3 gap-1.5 sm:flex sm:flex-wrap sm:gap-2">
                {Array.from({ length: MAX_EQUIPPED_SKILLS }).map((_, index) => {
                  const skillId = equippedSkills[index];

                  const skill = getAllSkills(tree).find(
                    (currentSkill) => currentSkill.id === skillId,
                  );

                  return (
                    <div
                      key={index}
                      className={`
                        group
                        relative
                        flex
                        h-9
                        min-w-0
                        items-center
                        justify-center
                        gap-1
                        rounded-lg
                        border
                        px-1.5
                        transition-all
                        sm:h-10
                        sm:w-32
                        sm:gap-1.5

                        ${
                          skill
                            ? "border-amber-600/50 bg-amber-900/20 text-amber-200"
                            : "border-amber-900/30 bg-slate-900/40 text-amber-100/20"
                        }
                      `}
                    >
                      {skill ? (
                        <>
                          <span className="hidden text-sm sm:inline">
                            {skill.emoji}
                          </span>

                          <span className="truncate text-[10px] font-medium sm:text-[11px]">
                            {skill.nome}
                          </span>

                          <button
                            type="button"
                            onClick={() => toggleEquip(skill.id)}
                            className="
                              absolute
                              -right-1.5
                              -top-1.5
                              hidden
                              h-4
                              w-4
                              items-center
                              justify-center
                              rounded-full
                              bg-rose-600
                              text-white
                              group-hover:flex
                            "
                          >
                            <X className="h-2.5 w-2.5" />
                          </button>
                        </>
                      ) : (
                        <span className="text-[10px] text-amber-100/20">
                          Slot {index + 1}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {changed && (
              <button
                type="button"
                onClick={saveEquippedSkills}
                className="
                  flex
                  items-center
                  gap-1.5
                  rounded-lg
                  bg-gradient-to-r
                  from-amber-500
                  to-rose-600
                  px-4
                  py-2
                  text-xs
                  font-semibold
                  text-white
                  shadow-md
                  shadow-amber-900/30
                  transition-all
                  hover:from-amber-400
                  hover:to-rose-500
                "
              >
                <Save className="h-3.5 w-3.5" />
                Salvar
              </button>
            )}
          </div>
        </section>

        <nav className="flex-shrink-0 border-b border-amber-900/20 bg-slate-900/40 px-3 py-2 sm:px-6 sm:py-3">
          <button
            type="button"
            onClick={() => setShowMobileTypes((value) => !value)}
            className="flex w-full items-center justify-between rounded-lg border border-amber-900/25 bg-slate-950/60 px-3 py-2 text-left text-xs font-medium text-amber-100/70 sm:hidden"
          >
            <span>Tipo: {activeFilterLabel}</span>
            {showMobileTypes ? (
              <ChevronUp className="h-4 w-4 text-amber-100/35" />
            ) : (
              <ChevronDown className="h-4 w-4 text-amber-100/35" />
            )}
          </button>

          {showMobileTypes && (
            <div className="mt-2 grid grid-cols-2 gap-1.5 sm:hidden">
              {filters}
            </div>
          )}

          <div className="hidden flex-wrap items-center gap-1 sm:flex">
            {filters}
          </div>
        </nav>

        <main className="flex-1 overflow-y-auto p-3 sm:p-5">
          {showCampaignSkills && (
            <div className="mb-4 flex items-start gap-2 rounded-lg border border-violet-800/30 bg-violet-900/20 p-3">
              <Wand2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />

              <div>
                <p className="text-xs font-semibold text-violet-300">
                  Skills Exclusivas da Campanha
                </p>

                <p className="mt-0.5 text-[11px] text-violet-300/50">
                  Criadas pelo Mestre para a campanha{" "}
                  <span className="text-violet-300/70">{campaign}</span>.
                </p>
              </div>
            </div>
          )}

          {isLoadingSkills ? (
            <div className="flex flex-col items-center justify-center py-16 text-amber-100/30">
              <BookOpen className="mb-3 h-10 w-10 animate-pulse" />
              <p className="text-sm">Carregando habilidades...</p>
            </div>
          ) : skillsError ? (
            <div className="flex flex-col items-center justify-center py-16 text-rose-300/70">
              <BookOpen className="mb-3 h-10 w-10" />
              <p className="text-sm">{skillsError}</p>
            </div>
          ) : activeSkills.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-amber-100/20">
              <BookOpen className="mb-3 h-10 w-10" />

              <p className="text-sm">Nenhuma skill disponível.</p>

              <p className="mt-1 text-xs">
                O Mestre ainda não criou skills para esta Marca.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {activeSkills.map((skill) => {
                const unlocked = skill.desbloqueada && hasRequiredLevel(skill);
                const equipped = equippedSkills.includes(skill.id);
                const canEquip =
                  skill.tipo === "ativa" || skill.tipo === "campanha";

                const slotsFull = equippedSkills.length >= MAX_EQUIPPED_SKILLS;

                const hovering = hoveredSkill === skill.id;

                return (
                  <div
                    key={skill.id}
                    onMouseEnter={() => setHoveredSkill(skill.id)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`
                      relative
                      rounded-xl
                      border
                      p-4
                      transition-all
                      duration-200

                      ${
                        skill.tipo === "penalidade"
                          ? "border-rose-900/50 bg-rose-950/30 hover:border-rose-700/50"
                          : skill.tipo === "passiva"
                            ? "border-amber-900/30 bg-amber-950/20 hover:border-amber-700/40"
                            : skill.tipo === "campanha"
                              ? "border-violet-900/40 bg-violet-950/20 hover:border-violet-700/50"
                              : equipped
                                ? "border-amber-500/40 bg-amber-900/15 hover:border-amber-500/60"
                                : unlocked
                                  ? "border-amber-900/30 bg-slate-900/40 hover:border-amber-700/50"
                                  : "border-slate-800/60 bg-slate-900/20 opacity-60"
                      }
                    `}
                  >
                    {skill.tipo === "passiva" && (
                      <SkillTag
                        label="Passiva"
                        className="text-amber-500/50 border-amber-900/30"
                      />
                    )}

                    {skill.tipo === "penalidade" && (
                      <SkillTag
                        label="Penalidade"
                        className="text-rose-400/60 border-rose-900/30"
                      />
                    )}

                    {skill.tipo === "campanha" && (
                      <SkillTag
                        label="Campanha"
                        className="text-violet-400/60 border-violet-900/30"
                      />
                    )}

                    {equipped && (
                      <SkillTag
                        label="Equipada"
                        className="bg-amber-900/20 text-amber-400/80 border-amber-600/40"
                      />
                    )}

                    <div className="flex items-start gap-3 pr-16">
                      <div
                        className={`
                          flex
                          h-10
                          w-10
                          flex-shrink-0
                          items-center
                          justify-center
                          rounded-lg
                          text-xl

                          ${unlocked ? "bg-slate-800/80" : "bg-slate-900/60"}
                        `}
                      >
                        {unlocked ? (
                          skill.emoji
                        ) : (
                          <Lock className="h-4 w-4 text-slate-600" />
                        )}
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3
                            className={`
                              text-sm
                              font-semibold
                              leading-tight

                              ${
                                skill.tipo === "penalidade"
                                  ? "text-rose-300"
                                  : unlocked
                                    ? "text-amber-100"
                                    : "text-amber-100/40"
                              }
                            `}
                          >
                            {skill.nome}
                          </h3>

                          <span
                            className={`
                              rounded
                              border
                              px-1.5
                              py-0.5
                              text-[9px]
                              font-medium

                              ${
                                hasRequiredLevel(skill)
                                  ? "border-emerald-700/40 bg-emerald-900/15 text-emerald-400/70"
                                  : "border-slate-700/40 bg-slate-900/20 text-slate-500"
                              }
                            `}
                          >
                            Lv {skill.nivel}
                          </span>

                          <span
                            className="
                              rounded
                              border
                              border-violet-700/40
                              bg-violet-900/15
                              px-1.5
                              py-0.5
                              text-[9px]
                              font-medium
                              text-violet-300/75
                            "
                          >
                            Custo: {skill.resourceCost ?? 0}
                          </span>
                        </div>

                        <p
                          className={`
                            mt-1
                            text-[11px]
                            leading-relaxed

                            ${
                              skill.tipo === "penalidade"
                                ? "text-rose-300/60"
                                : unlocked
                                  ? "text-amber-100/50"
                                  : "text-amber-100/25"
                            }
                          `}
                        >
                          {skill.descricao}
                        </p>

                        {!unlocked && (
                          <p className="mt-3 inline-flex items-center gap-1 rounded-md border border-slate-700/40 bg-slate-900/40 px-2 py-1 text-[10px] text-slate-500">
                            <Lock className="h-2.5 w-2.5" />
                            Requer nível {skill.nivel}
                          </p>
                        )}
                      </div>
                    </div>

                    {canEquip && unlocked && (
                      <div
                        className={`
                          mt-3
                          flex
                          justify-end
                          transition-opacity
                          ${hovering || equipped ? "sm:opacity-100" : "sm:opacity-0"}
                        `}
                      >
                        <button
                          type="button"
                          onClick={() => toggleEquip(skill.id)}
                          disabled={!equipped && slotsFull}
                          className={`
                            rounded-lg
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-medium
                            transition-all

                            ${
                              equipped
                                ? "border-rose-700/40 text-rose-400 hover:bg-rose-900/20"
                                : slotsFull
                                  ? "cursor-not-allowed border-slate-800 text-slate-600"
                                  : "border-amber-700/40 text-amber-400 hover:bg-amber-900/20"
                            }
                          `}
                        >
                          {equipped
                            ? "Desequipar"
                            : slotsFull
                              ? "Slots cheios"
                              : "Equipar"}
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>

        <footer className="hidden flex-shrink-0 items-center justify-between border-t border-amber-900/20 bg-slate-900/60 px-6 py-3 sm:flex">
          <div className="flex items-center gap-4 text-[10px] text-amber-100/30">
            <span className="flex items-center gap-1">
              <Unlock className="h-3 w-3" />
              Desbloqueada
            </span>

            <span className="flex items-center gap-1">
              <Lock className="h-3 w-3" />
              Bloqueada
            </span>

            <span className="flex items-center gap-1">
              <span className="inline-block h-2 w-2 rounded bg-amber-600/60" />
              Equipada
            </span>
          </div>

          <span className="text-[10px] text-amber-100/30">
            {equippedSkills.length}/{MAX_EQUIPPED_SKILLS} slots ocupados
          </span>
        </footer>
      </div>
    </div>
  );
}

type SkillTagProps = {
  label: string;
  className: string;
};

function SkillTag({ label, className }: SkillTagProps) {
  return (
    <span
      className={`
        absolute
        right-3
        top-3
        rounded
        border
        px-1.5
        py-0.5
        text-[9px]
        uppercase
        tracking-widest
        ${className}
      `}
    >
      {label}
    </span>
  );
}
