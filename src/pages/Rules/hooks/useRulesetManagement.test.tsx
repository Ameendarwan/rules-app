import { fireEvent, render, screen } from '@testing-library/react';

import { Provider } from 'react-redux';
import Rules from '../Rules';
import { configureStore } from '@reduxjs/toolkit';
import { rulesReducer } from '@app/store/slices/rules';
import { vi } from 'vitest';

const renderHook = () => {
  const mockDispatch = vi.fn();
  const store = configureStore({
    reducer: {
      rules: rulesReducer,
    },
    middleware: getDefaultMiddleware =>
      getDefaultMiddleware().concat(() => next => action => {
        mockDispatch(action);
        return next(action);
      }),
  });

  const Wrapper = ({ children }: { children: React.ReactNode }) => <Provider store={store}>{children}</Provider>;

  render(
    <Wrapper>
      <Rules />
    </Wrapper>
  );
  return mockDispatch;
};

describe('useRulesetManagement Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should dispatch addNewRule action when Add New Rule button is clicked', () => {
    const mockDispatch = renderHook();

    const editRuleButton = screen.getByText('Edit Rules');
    fireEvent.click(editRuleButton);

    const addButton = screen.getByText('Add New Rule');
    fireEvent.click(addButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/addNewRule' });
  });

  it('should dispatch deleteRuleset action when Delete Ruleset button is clicked', () => {
    const mockDispatch = renderHook();

    const editRuleButton = screen.getByText('Edit Rules');
    fireEvent.click(editRuleButton);

    const deleteButton = screen.getByText('Delete Ruleset');
    fireEvent.click(deleteButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/deleteRuleset' });
  });

  it('should dispatch toggleEditMode action when Edit Ruleset button is clicked', () => {
    const mockDispatch = renderHook();

    const editButton = screen.getByText('Edit Rules');
    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/toggleEditMode', payload: true });
  });

  it('should dispatch copyRuleset action when Copy Ruleset button is clicked', () => {
    const mockDispatch = renderHook();

    const editButton = screen.getByText('Copy Ruleset');
    fireEvent.click(editButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/copyRuleset' });
  });

  it('should dispatch saveChanges action when Save Changes button is clicked', () => {
    const mockDispatch = renderHook();

    const editRuleButton = screen.getByText('Edit Rules');
    fireEvent.click(editRuleButton);

    const saveButton = screen.getByText('Save Changes');
    fireEvent.click(saveButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/saveChanges' });
  });

  it('should dispatch cancelEdit action when Cancel button is clicked', () => {
    const mockDispatch = renderHook();

    const editRuleButton = screen.getByText('Edit Rules');
    fireEvent.click(editRuleButton);

    const cancelButton = screen.getByText('Cancel');
    fireEvent.click(cancelButton);

    const confirmButton = screen.getByText('Yes');
    fireEvent.click(confirmButton);

    expect(mockDispatch).toHaveBeenCalledWith({ type: 'rules/toggleEditMode', payload: true });
  });
});
