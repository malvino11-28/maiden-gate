import { useState } from "react";
import { BookOpen, Lock, Save, Unlock, Wand2, X } from "lucide-react";

import {
  getAllSkills,
  getInitialEquippedSkills,
  getMarkMeta,
  getSkillTreeByMark,
  MAX_EQUIPPED_SKILLS,
  skillBranches,
} from "../../data/skillTreeMock";

import type { CharacterSkill, SkillBranchKey } from "../../data/skillTreeMock";

type Props = {
  mark: string;
  level: number;
  characterName: string;
  campaign?: string;
  onClose: () => void;
};

export default function SkillTreeModal({
  mark,
  level,
  characterName,
  campaign,
  onClose,
}: Props) {
  const meta = getMarkMeta(mark);
  const tree = getSkillTreeByMark(mark);

  const [branch, setBranch] = useState<SkillBranchKey>("ofensivo");
  const [showCampaignSkills, setShowCampaignSkills] = useState(false);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const initialEquipped = getInitialEquippedSkills(tree);

  const [equippedSkills, setEquippedSkills] =
    useState<string[]>(initialEquipped);

  const [savedEquippedSkills, setSavedEquippedSkills] =
    useState<string[]>(initialEquipped);

  const changed =
    JSON.stringify(equippedSkills) !== JSON.stringify(savedEquippedSkills);

  const activeSkills = showCampaignSkills
    ? tree.campanha
    : (tree[branch] ?? []);

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
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
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
          h-[92vh]
          w-full
          max-w-7xl
          flex-col
          overflow-hidden
          rounded-2xl
          border
          border-amber-900/40
          bg-slate-950
          shadow-2xl
        "
      >
        <header
          className="
            flex
            flex-shrink-0
            items-start
            justify-between
            border-b
            border-amber-900/30
            px-6
            py-5
          "
          style={{
            background:
              "linear-gradient(135deg, rgba(30,20,5,0.9) 0%, rgba(15,15,25,0.9) 100%)",
          }}
        >
          <div className="flex items-center gap-4">
            <div
              className={`
                flex
                h-12
                w-12
                items-center
                justify-center
                rounded-xl
                border
                bg-gradient-to-br
                text-2xl
                shadow-lg
                ${meta.gradient}
                ${meta.active.split(" ")[0]}
              `}
            >
              {meta.emoji}
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold text-amber-100">
                  Árvore de Habilidades
                </h2>

                <span
                  className={`
                    rounded-full
                    border
                    px-2
                    py-0.5
                    text-xs
                    ${meta.active}
                    ${meta.text}
                  `}
                >
                  Marca {mark}
                </span>
              </div>

              <p className="mt-0.5 text-xs text-amber-100/40">
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

        <section className="flex-shrink-0 border-b border-amber-900/20 bg-slate-900/60 px-6 py-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-amber-600/60">
                Equipadas
              </span>

              <div className="flex flex-wrap gap-2">
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
                        h-10
                        w-32
                        items-center
                        justify-center
                        gap-1.5
                        rounded-lg
                        border
                        transition-all

                        ${
                          skill
                            ? "border-amber-600/50 bg-amber-900/20 text-amber-200"
                            : "border-amber-900/30 bg-slate-900/40 text-amber-100/20"
                        }
                      `}
                    >
                      {skill ? (
                        <>
                          <span className="text-sm">{skill.emoji}</span>

                          <span className="truncate text-[11px] font-medium">
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

        <nav className="flex flex-shrink-0 flex-wrap items-center gap-1 border-b border-amber-900/20 bg-slate-900/40 px-6 py-3">
          {skillBranches.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => {
                setBranch(key);
                setShowCampaignSkills(false);
              }}
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
              onClick={() => setShowCampaignSkills(true)}
              className={`
                ml-auto
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
        </nav>

        <main className="flex-1 overflow-y-auto p-5">
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

          {activeSkills.length === 0 ? (
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
                      </div>
                    </div>

                    {canEquip && unlocked && (
                      <div
                        className={`
                          mt-3
                          flex
                          justify-end
                          transition-opacity

                          ${hovering || equipped ? "opacity-100" : "opacity-0"}
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

                    {!unlocked && (
                      <div className="pointer-events-none absolute inset-0 flex items-end justify-center rounded-xl pb-3">
                        <span className="flex items-center gap-1 text-[10px] text-slate-600">
                          <Lock className="h-2.5 w-2.5" />
                          Requer nível {skill.nivel}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </main>

        <footer className="flex flex-shrink-0 items-center justify-between border-t border-amber-900/20 bg-slate-900/60 px-6 py-3">
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
