import type { ElementType } from "react";

export type RuleTopic = {
  title: string;
  content: string;
};

export type RuleTab = {
  key: string;
  label: string;
  icon: ElementType;
  title: string;
  description: string;
  topics: RuleTopic[];
};
