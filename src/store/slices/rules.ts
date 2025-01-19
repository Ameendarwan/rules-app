import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '..';
import { RuleSet } from '@app/pages/Rules/types';
import cloneDeep from 'lodash/cloneDeep';
import { mockRuleset } from '@app/mock/data';

const generateRandomId = () => {
  return Math.floor(1000 + Math.random() * 9000);
};

interface RulesState {
  ruleset: RuleSet[];
  selectedRuleset: RuleSet | null;
  isEditMode: boolean;
  editingRuleId: number | null;
}

const initialState: RulesState = {
  ruleset: cloneDeep(mockRuleset),
  selectedRuleset: mockRuleset[0],
  isEditMode: false,
  editingRuleId: null,
};

const rulesSlice = createSlice({
  name: 'rules',
  initialState,
  reducers: {
    addNewRuleset(state) {
      const newRuleset = {
        id: generateRandomId(),
        name: 'New Ruleset',
        rules: [],
      };
      state.ruleset.push(newRuleset);
    },
    selectRuleset(state, action: PayloadAction<number | string>) {
      if (`${action.payload}` === 'Add New Ruleset') {
        rulesSlice.caseReducers.addNewRuleset(state);
      } else {
        const selected = state.ruleset.find(r => r.id === Number(action.payload));
        if (selected) state.selectedRuleset = selected;
      }
    },
    copyRuleset(state) {
      if (!state.selectedRuleset) return;
      const findCopies = state.ruleset.filter(set => set.name.split('_(')?.[0] === state.selectedRuleset?.name);

      state.ruleset.push({
        ...state.selectedRuleset,
        id: generateRandomId(),
        name: `${state.selectedRuleset.name}_(${findCopies.length})`,
      });
    },
    resetSelectedRuleset(state) {
      if (!state.selectedRuleset) return;
      const resetRuleset = state.ruleset.find(r => r.id === state.selectedRuleset!.id);
      if (resetRuleset) state.selectedRuleset = resetRuleset;
      state.editingRuleId = null;
    },
    addNewRule(state) {
      if (!state.selectedRuleset) return;

      const newRule = {
        id: generateRandomId(),
        measurement: 'N/A',
        comparator: '<',
        comparedValue: 1,
        unitName: 'ms',
        findingName: 'N/A',
        action: 'Normal',
      };

      state.editingRuleId = newRule.id;
      const updatedRuleset = {
        ...state.selectedRuleset,
        rules: [...state.selectedRuleset.rules, newRule],
      };

      state.ruleset = state.ruleset.map(r => (r.id === state.selectedRuleset!.id ? updatedRuleset : r));
      state.selectedRuleset = updatedRuleset;
    },
    editRule(state, action: PayloadAction<number>) {
      state.editingRuleId = action.payload;
    },
    deleteRule(state, action: PayloadAction<number>) {
      if (!state.selectedRuleset) return;
      const updatedRules = state.selectedRuleset.rules.filter(rule => rule.id !== action.payload);
      state.ruleset = state.ruleset.map(r => (r.id === state.selectedRuleset!.id ? { ...r, rules: updatedRules } : r));
      state.selectedRuleset = { ...state.selectedRuleset, rules: updatedRules };
    },
    deleteRuleset(state) {
      state.ruleset = state.ruleset.filter(r => r.id !== state.selectedRuleset?.id);
      state.selectedRuleset = state.ruleset[0] || null;
      state.isEditMode = false;
    },
    saveChanges(state) {
      state.isEditMode = false;
      if (state.selectedRuleset) {
        state.ruleset = state.ruleset.map(r =>
          r.id === state.selectedRuleset!.id ? { ...r, name: state.selectedRuleset!.name } : r
        );
      }
    },
    cancelEdit(state) {
      state.isEditMode = false;
      state.editingRuleId = null;
      if (state.selectedRuleset) {
        const resetRuleset = state.ruleset.find(r => r.id === state.selectedRuleset!.id);
        if (resetRuleset) state.selectedRuleset = resetRuleset;
      }
    },
    toggleEditMode(state, action: PayloadAction<boolean>) {
      state.isEditMode = action.payload;
    },
    setEditingRuleId(state, action: PayloadAction<number | null>) {
      state.editingRuleId = action.payload;
    },
    handleDrag(state, action: PayloadAction<{ activeId: number; overId: number }>) {
      const { activeId, overId } = action.payload;
      if (!state.selectedRuleset || activeId === overId) return;

      const oldIndex = state.selectedRuleset.rules.findIndex(rule => rule.id === activeId);
      const newIndex = state.selectedRuleset.rules.findIndex(rule => rule.id === overId);

      if (oldIndex !== -1 && newIndex !== -1) {
        const updatedRules = [...state.selectedRuleset.rules];
        const [movedRule] = updatedRules.splice(oldIndex, 1);
        updatedRules.splice(newIndex, 0, movedRule);

        const updatedRuleset = { ...state.selectedRuleset, rules: updatedRules };
        state.ruleset = state.ruleset.map(set => (set.id === state.selectedRuleset!.id ? updatedRuleset : set));
        state.selectedRuleset = updatedRuleset;
      }
    },
    handleRuleNameChange(state, action: PayloadAction<string>) {
      if (state.selectedRuleset) {
        state.selectedRuleset.name = action.payload;
      }
    },
    handleRuleFieldChange(
      state,
      action: PayloadAction<{ ruleId: number; field: keyof RuleSet['rules'][0]; value: string }>
    ) {
      const { ruleId, field, value } = action.payload;
      if (state.selectedRuleset) {
        const updatedRules = state.selectedRuleset.rules.map(rule =>
          rule.id === ruleId ? { ...rule, [field]: value } : rule
        );
        state.selectedRuleset.rules = updatedRules;
        state.ruleset = state.ruleset.map(r =>
          !!state.selectedRuleset && r.id === state.selectedRuleset!.id
            ? { ...state.selectedRuleset, rules: updatedRules }
            : r
        );
      }
    },
    saveRowChanges(state) {
      state.isEditMode = false;
      if (state.selectedRuleset) {
        const updatedRuleset = { ...state.selectedRuleset };
        state.ruleset = state.ruleset.map(r => (r.id === state?.selectedRuleset?.id ? updatedRuleset : r));
        state.selectedRuleset = updatedRuleset;
        state.editingRuleId = null;
      }
    },
  },
});

export const {
  addNewRuleset,
  selectRuleset,
  copyRuleset,
  resetSelectedRuleset,
  addNewRule,
  editRule,
  deleteRule,
  deleteRuleset,
  saveChanges,
  cancelEdit,
  toggleEditMode,
  setEditingRuleId,
  handleRuleFieldChange,
  handleRuleNameChange,
  handleDrag,
  saveRowChanges,
} = rulesSlice.actions;

export const getRuleset = (state: RootState) => state.rules.ruleset;
export const getSelectedRuleset = (state: RootState) => state.rules.selectedRuleset;

export const rulesReducer = rulesSlice.reducer;
