import { useState } from "react";
import { ChevronDown, ChevronUp, Plus, Trash2 } from "lucide-react";
import type { LucideIcon } from "lucide-react";

import CampaignStepNavigation from "../CreateCampaign/CampaignStepNavigation";

type Field<T> = {
  name: keyof T;
  label: string;
  placeholder: string;
  type?: "text" | "textarea";
};

type EditableListSectionProps<T extends object> = {
  title: string;
  description: string;
  icon: LucideIcon;
  iconClassName: string;
  items: T[];
  emptyItem: () => T;
  fields: Field<T>[];
  addLabel: string;
  titleField: keyof T;
  onChange: (items: T[]) => void;
  onNext?: () => void;
  onPrevious?: () => void;
  nextLabel?: string;
  finish?: boolean;
};

function inputClass(extra = "") {
  return `w-full rounded-lg border border-amber-900/30 bg-slate-900/60 px-4 py-2.5 text-sm text-amber-100 placeholder-amber-100/20 outline-none transition-colors focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/20 ${extra}`;
}

function EntryCard<T extends object>({
  item,
  index,
  fields,
  titleField,
  onUpdate,
  onDelete,
}: {
  item: T;
  index: number;
  fields: Field<T>[];
  titleField: keyof T;
  onUpdate: (index: number, updates: Partial<T>) => void;
  onDelete: (index: number) => void;
}) {
  const [open, setOpen] = useState(index === 0);
  const title = String(item[titleField] ?? "");

  return (
    <div className="overflow-hidden rounded-xl border border-amber-900/25 bg-slate-900/40">
      <div
        className="flex cursor-pointer items-center gap-3 px-4 py-3 transition-colors hover:bg-amber-900/10"
        onClick={() => setOpen((value) => !value)}
      >
        <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border border-amber-700/30 bg-amber-900/30">
          <span className="font-mono text-xs text-amber-400/70">{index + 1}</span>
        </div>

        <p className="flex-1 truncate text-sm text-amber-100/80">
          {title || <span className="italic text-amber-100/30">sem título</span>}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(index);
            }}
            className="flex h-6 w-6 items-center justify-center rounded text-amber-100/25 transition-colors hover:text-rose-400"
          >
            <Trash2 className="h-3.5 w-3.5" />
          </button>
          {open ? <ChevronUp className="h-4 w-4 text-amber-100/30" /> : <ChevronDown className="h-4 w-4 text-amber-100/30" />}
        </div>
      </div>

      {open && (
        <div className="space-y-3 border-t border-amber-900/20 px-4 py-4">
          {fields.map((field) => (
            <div key={String(field.name)}>
              <label className="mb-1 block text-xs font-medium text-amber-100/50">
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <textarea
                  rows={3}
                  placeholder={field.placeholder}
                  value={String(item[field.name] ?? "")}
                  onChange={(e) => onUpdate(index, { [field.name]: e.target.value } as Partial<T>)}
                  className={inputClass("resize-none leading-relaxed")}
                />
              ) : (
                <input
                  type="text"
                  placeholder={field.placeholder}
                  value={String(item[field.name] ?? "")}
                  onChange={(e) => onUpdate(index, { [field.name]: e.target.value } as Partial<T>)}
                  className={inputClass()}
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function EditableListSection<T extends object>({
  title,
  description,
  icon: Icon,
  iconClassName,
  items,
  emptyItem,
  fields,
  addLabel,
  titleField,
  onChange,
  onNext,
  onPrevious,
  nextLabel,
  finish = false,
}: EditableListSectionProps<T>) {
  function addItem() {
    onChange([...items, emptyItem()]);
  }

  function updateItem(index: number, updates: Partial<T>) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...updates } : item)));
  }

  function deleteItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <section className="mx-auto max-w-2xl px-6 py-10">
      <div className="mb-6">
        <h2 className="mb-1 flex items-center gap-3 text-3xl font-semibold text-amber-100">
          <Icon className={`h-7 w-7 ${iconClassName}`} />
          {title}
        </h2>
        <p className="text-sm text-amber-100/40">{description}</p>
      </div>

      <div className="mb-6 flex items-center gap-3">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-amber-900/40" />
        <div className="h-1.5 w-1.5 rotate-45 bg-amber-700/50" />
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-amber-900/40" />
      </div>

      <div className="space-y-3">
        {items.map((item, index) => (
          <EntryCard
            key={index}
            item={item}
            index={index}
            fields={fields}
            titleField={titleField}
            onUpdate={updateItem}
            onDelete={deleteItem}
          />
        ))}

        <button
          type="button"
          onClick={addItem}
          className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-dashed border-amber-900/40 py-3 text-sm text-amber-500/70 transition-all hover:border-amber-700/60 hover:text-amber-300"
        >
          <Plus className="h-4 w-4" />
          {addLabel}
        </button>
      </div>

      <CampaignStepNavigation
        onPrevious={onPrevious}
        onNext={onNext}
        nextLabel={nextLabel}
        finish={finish}
      />
    </section>
  );
}
