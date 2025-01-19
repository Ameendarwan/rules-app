import { ChangeEvent } from 'react';
import { RuleSet } from '../types';

export const useRuleFieldChange = (
  selectedRuleset: RuleSet | null,
  setSelectedRuleset: React.Dispatch<React.SetStateAction<RuleSet | null>>
) => {
  const handleRuleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRuleset(prevState => (prevState?.id ? { ...prevState, name: event.target.value } : null));
  };

  const handleRuleFieldChange = (ruleId: number, field: keyof RuleSet['rules'][0], value: string) => {
    if (!selectedRuleset) return;
    const updatedRules = selectedRuleset.rules.map(rule => (rule.id === ruleId ? { ...rule, [field]: value } : rule));
    setSelectedRuleset(prevState => (prevState ? { ...prevState, rules: updatedRules } : null));
  };

  return { handleRuleFieldChange, handleRuleNameChange };
};
