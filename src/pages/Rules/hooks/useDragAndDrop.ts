import { PointerSensor, useSensor, useSensors } from '@dnd-kit/core';

import { DragEndEvent } from '@dnd-kit/core';
import { RuleSet } from '../types';

export const useDragAndDrop = (
  selectedRuleset: RuleSet | null,
  setRuleset: React.Dispatch<React.SetStateAction<RuleSet[]>>,
  setSelectedRuleset: React.Dispatch<React.SetStateAction<RuleSet | null>>
) => {
  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!active || !over || active.id === over.id) return;

    const oldIndex = selectedRuleset?.rules.findIndex(rule => rule.id === active.id);
    const newIndex = selectedRuleset?.rules.findIndex(rule => rule.id === over.id);

    if (oldIndex !== undefined && newIndex !== undefined && selectedRuleset) {
      const updatedRules = [...selectedRuleset?.rules];
      const [movedRule] = updatedRules.splice(oldIndex, 1);
      updatedRules.splice(newIndex, 0, movedRule);

      const updatedRuleset = { ...selectedRuleset, rules: updatedRules };
      setRuleset(prevState => prevState.map(set => (set.id === selectedRuleset?.id ? updatedRuleset : set)));
      setSelectedRuleset(updatedRuleset);
    }
  };

  return { sensors, handleDragEnd };
};
