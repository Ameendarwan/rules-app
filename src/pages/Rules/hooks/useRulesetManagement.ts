import { useCallback, useState } from 'react';

import { RuleSet } from '../types';
import cloneDeep from 'lodash/cloneDeep';
import { mockRuleset } from '@app/mock/data';

export const useRulesetManagement = () => {
  const [ruleset, setRuleset] = useState<RuleSet[]>(cloneDeep(mockRuleset));
  const [selectedRuleset, setSelectedRuleset] = useState<RuleSet | null>(mockRuleset[0]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);

  const handleCopyRuleset = useCallback(() => {
    const findCopies = ruleset.filter(set => set.name.split('_(')?.[0] === selectedRuleset?.name);

    if (selectedRuleset)
      setRuleset(prevState => [
        ...prevState,
        {
          ...selectedRuleset,
          id: Date.now(),
          name: `${selectedRuleset.name}_(${findCopies.length})`,
        },
      ]);
  }, [selectedRuleset]);

  const handleResetSelectedRuleset = (event: React.MouseEvent<SVGSVGElement>) => {
    handleMouseUp(event, () => {
      setEditingRuleId(null);
      if (!!selectedRuleset) {
        let result = ruleset.find(set => set.id === selectedRuleset.id);
        if (!!result) setSelectedRuleset(result);
      }
    });
  };

  const handleAddNewRule = () => {
    if (!selectedRuleset) return;

    const newRule = {
      id: Date.now(),
      measurement: '',
      comparator: '<',
      comparedValue: '',
      findingName: '',
      action: '',
      isNew: true,
    };

    setEditingRuleId(newRule.id);

    const updatedRuleset = {
      ...selectedRuleset,
      rules: [...selectedRuleset.rules, newRule],
    };
    if (selectedRuleset)
      setRuleset(prevState => prevState.map(ruleset => (ruleset.id === selectedRuleset.id ? updatedRuleset : ruleset)));
    setSelectedRuleset(updatedRuleset);
    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth',
      });
    }, 100);
  };

  const handleEditRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      setEditingRuleId(ruleId);
    });
  };

  const handleEditRuleset = () => {
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setEditingRuleId(null);
    if (!!selectedRuleset) {
      let result = ruleset.find(set => set.id === selectedRuleset.id);
      if (!!result) setSelectedRuleset(result);
    }
  };

  const handleSaveChanges = () => {
    setIsEditMode(false);
    if (!!selectedRuleset)
      setRuleset(prevState =>
        prevState.map(ruleset =>
          ruleset.id === selectedRuleset.id ? { ...ruleset, name: selectedRuleset?.name } : ruleset
        )
      );
  };

  const handleSaveRowChanges = (event: React.MouseEvent<SVGSVGElement>) => {
    handleMouseUp(event, () => {
      setIsEditMode(false);
      if (!!selectedRuleset) {
        setRuleset(prevState =>
          prevState.map(ruleset => (ruleset.id === selectedRuleset.id ? { ...selectedRuleset } : ruleset))
        );
        setEditingRuleId(null);
      }
    });
  };

  const handleDeleteRuleset = useCallback(() => {
    setRuleset(prevState => {
      const updatedRuleset = prevState.filter(ruleset => ruleset.id !== selectedRuleset?.id);
      setSelectedRuleset(updatedRuleset[0] || null);
      return updatedRuleset;
    });
    setIsEditMode(false);
  }, [selectedRuleset]);

  const handleMouseUp = (event: React.MouseEvent<SVGSVGElement>, callback: () => void) => {
    const startTime = new Date().getTime();

    const onMouseUp = () => {
      const endTime = new Date().getTime();
      const timeDiff = endTime - startTime;

      // If the mouse was down for less than 200ms, consider it a click
      if (timeDiff < 200) {
        callback(); // Execute the passed callback function
      }

      // Clean up
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
  };

  const handleDeleteRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      if (!selectedRuleset) return;
      const updatedRules = selectedRuleset.rules.filter(rule => rule.id !== ruleId);
      setRuleset(prevState =>
        prevState.map(ruleset => (ruleset.id === selectedRuleset.id ? { ...ruleset, rules: updatedRules } : ruleset))
      );
      setSelectedRuleset({ ...selectedRuleset, rules: updatedRules });
    });
  };

  const handleAddNewRuleset = () => {
    let newRulset = {
      id: Date.now(),
      name: 'New Ruleset',
      rules: [],
    };
    console.log('YUP');
    setRuleset(prevState => [...prevState, newRulset]);
  };

  const handleSelectRuleset = (rulesetId: number | string) => {
    console.log('PP', rulesetId);
    if (`${rulesetId}` === 'Add New Ruleset') handleAddNewRuleset();
    else {
      let result = ruleset.find(item => item.id === Number(rulesetId));
      if (!!result) setSelectedRuleset(result);
    }
  };

  return {
    ruleset,
    selectedRuleset,
    isEditMode,
    editingRuleId,
    handleDeleteRule,
    handleSaveRowChanges,
    handleEditRule,
    handleEditRuleset,
    handleCancel,
    handleAddNewRuleset,
    setSelectedRuleset,
    setRuleset,
    handleSelectRuleset,
    handleCopyRuleset,
    handleResetSelectedRuleset,
    handleAddNewRule,
    handleSaveChanges,
    handleDeleteRuleset,
    setIsEditMode,
    setEditingRuleId,
  };
};
