import {
  addNewRule,
  cancelEdit,
  copyRuleset,
  deleteRule,
  deleteRuleset,
  editRule,
  resetSelectedRuleset,
  saveChanges,
  saveRowChanges,
  selectRuleset,
  toggleEditMode,
} from '@app/store/slices/rules';
import { getRuleset, getSelectedRuleset } from '@app/store/slices/rules';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '@app/store';
import { useCallback } from 'react';
import { useToast } from '@app/hooks/useToast';

export const useRulesetManagement = () => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const ruleset = useSelector(getRuleset);
  const selectedRuleset = useSelector(getSelectedRuleset);
  const isEditMode = useSelector((state: RootState) => state.rules.isEditMode);
  const editingRuleId = useSelector((state: RootState) => state.rules.editingRuleId);

  // Handles copying of the current ruleset
  const handleCopyRuleset = useCallback(() => {
    dispatch(copyRuleset());
    toast({
      variant: 'success',
      title: 'A new copy of the selected ruleset has been added',
    });
  }, [dispatch]);

  // Resets the selected ruleset
  const handleResetSelectedRuleset = (event: React.MouseEvent<any>) => {
    handleMouseUp(event, () => {
      dispatch(resetSelectedRuleset());
    });
  };

  // Adds a new rule to the selected ruleset
  const handleAddNewRule = () => {
    if (selectedRuleset) {
      dispatch(addNewRule());
      setTimeout(() => {
        window.scrollTo({
          top: document.body.scrollHeight + 400,
          behavior: 'smooth',
        });
      }, 100);
    }
  };

  // Edits a specific rule based on its ID
  const handleEditRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      dispatch(editRule(ruleId));
    });
  };

  // Toggles the edit mode for the ruleset
  const handleEditRuleset = () => {
    dispatch(toggleEditMode(true));
  };

  // Cancels the current edit mode
  const handleCancel = () => {
    dispatch(cancelEdit());
  };

  // Saves all changes made to the ruleset
  const handleSaveChanges = () => {
    dispatch(saveChanges());
    toast({
      variant: 'success',
      title: 'Ruleset has been updated',
    });
  };

  // Handles deletion of the current ruleset
  const handleDeleteRuleset = useCallback(() => {
    dispatch(deleteRuleset());
    toast({
      variant: 'success',
      title: 'Ruleset has been deleted',
    });
  }, [dispatch]);

  // Deletes a specific rule based on its ID
  const handleDeleteRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      dispatch(deleteRule(ruleId));
    });
    toast({
      variant: 'success',
      title: 'Rule has been deleted',
    });
  };

  // Selects a specific ruleset by ID
  const handleSelectRuleset = (rulesetId: number | string) => {
    dispatch(selectRuleset(rulesetId));
  };

  // Saves changes for a specific row in the ruleset
  const handleSaveRowChanges = () => {
    dispatch(saveRowChanges());
    toast({
      variant: 'success',
      title: 'Rule has been updated',
    });
  };

  // Handles mouse up event and executes a callback if the time difference is small
  const handleMouseUp = (_: React.MouseEvent<SVGSVGElement>, callback: () => void) => {
    const startTime = new Date().getTime();

    const onMouseUp = () => {
      const endTime = new Date().getTime();
      const timeDiff = endTime - startTime;

      if (timeDiff < 200) {
        callback(); // Executes the callback if the mouse-up duration is short
      }

      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp); // Adds a listener to detect mouse-up event
  };

  return {
    ruleset,
    selectedRuleset,
    isEditMode,
    editingRuleId,
    handleDeleteRule,
    handleSaveChanges,
    handleEditRule,
    handleEditRuleset,
    handleCancel,
    handleSelectRuleset,
    handleCopyRuleset,
    handleResetSelectedRuleset,
    handleAddNewRule,
    handleDeleteRuleset,
    handleSaveRowChanges,
  };
};
