import {
  addNewRule,
  addNewRuleset,
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

export const useRulesetManagement = () => {
  const dispatch = useDispatch();
  const ruleset = useSelector(getRuleset);
  const selectedRuleset = useSelector(getSelectedRuleset);
  const isEditMode = useSelector((state: RootState) => state.rules.isEditMode);
  const editingRuleId = useSelector((state: RootState) => state.rules.editingRuleId);

  const handleCopyRuleset = useCallback(() => {
    dispatch(copyRuleset());
  }, [dispatch]);

  const handleResetSelectedRuleset = (event: React.MouseEvent<SVGSVGElement>) => {
    handleMouseUp(event, () => {
      dispatch(resetSelectedRuleset());
    });
  };

  const handleAddNewRule = () => {
    if (selectedRuleset) {
      dispatch(addNewRule());
    }
  };

  const handleEditRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      dispatch(editRule(ruleId));
    });
  };

  const handleEditRuleset = () => {
    dispatch(toggleEditMode(true));
  };

  const handleCancel = () => {
    dispatch(cancelEdit());
  };

  const handleSaveChanges = () => {
    dispatch(saveChanges());
  };

  const handleDeleteRuleset = useCallback(() => {
    dispatch(deleteRuleset());
  }, [dispatch]);

  const handleDeleteRule = (event: React.MouseEvent<SVGSVGElement>, ruleId: number) => {
    handleMouseUp(event, () => {
      dispatch(deleteRule(ruleId));
    });
  };

  const handleAddNewRuleset = () => {
    dispatch(addNewRuleset());
  };

  const handleSelectRuleset = (rulesetId: number | string) => {
    dispatch(selectRuleset(rulesetId));
  };

  const handleSaveRowChanges = () => {
    dispatch(saveRowChanges());
  };

  const handleMouseUp = (event: React.MouseEvent<SVGSVGElement>, callback: () => void) => {
    const startTime = new Date().getTime();

    const onMouseUp = () => {
      const endTime = new Date().getTime();
      const timeDiff = endTime - startTime;

      if (timeDiff < 200) {
        callback();
      }

      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mouseup', onMouseUp);
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
    handleAddNewRuleset,
    handleSelectRuleset,
    handleCopyRuleset,
    handleResetSelectedRuleset,
    handleAddNewRule,
    handleDeleteRuleset,
    handleSaveRowChanges,
  };
};
