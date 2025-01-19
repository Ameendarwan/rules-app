import { DndContext, closestCenter } from '@dnd-kit/core';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/Select/Select';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/components/Table/Table';
import { comparators, ruleActions, units } from './Rules.utils';
import { handleRuleFieldChange, handleRuleNameChange } from '@app/store/slices/rules';

import { Button } from '@app/components/Button/Button';
import ConfirmationDialog from '@app/components/ConfirmationDialog';
import { Icon } from '@iconify/react';
import { Input } from '@app/components/Input/Input';
import SortableItem from './components/SortableItem';
import { useDispatch } from 'react-redux';
import { useDragAndDrop } from './hooks/useDragAndDrop';
import { useRulesetManagement } from './hooks/useRulesetManagement';

const Rules = () => {
  const dispatch = useDispatch();
  const {
    ruleset,
    selectedRuleset,
    isEditMode,
    editingRuleId,
    handleSelectRuleset,
    handleCopyRuleset,
    handleResetSelectedRuleset,
    handleAddNewRule,
    handleSaveChanges,
    handleDeleteRuleset,
    handleDeleteRule,
    handleSaveRowChanges,
    handleEditRule,
    handleEditRuleset,
    handleCancel,
  } = useRulesetManagement();

  const { sensors, handleDragEnd } = useDragAndDrop();

  return (
    <div className="flex h-full w-full flex-col sm:p-4 lg:p-10">
      <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4 py-4 max-sm:flex-col max-sm:px-4">
        {!isEditMode && (
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 md:gap-6">
            <Select value={`${selectedRuleset?.id}`} onValueChange={value => handleSelectRuleset(value)}>
              <SelectTrigger className="h-8 w-full text-xs md:w-1/3">
                <SelectValue placeholder="Select Ruleset" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ruleset.map(ruleset => (
                    <SelectItem key={ruleset.id} value={`${ruleset.id}`} className="text-xs">
                      {ruleset.name}
                    </SelectItem>
                  ))}
                  <SelectItem value="Add New Ruleset" className="text-xs font-bold">
                    +Add New Ruleset
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <div className="flex flex-row items-center gap-6">
              <Button disabled={!ruleset.length} variant="secondary" onClick={handleEditRuleset}>
                Edit Rules
              </Button>
              <Button disabled={!ruleset.length} onClick={handleCopyRuleset}>
                Copy Ruleset
              </Button>
            </div>
          </div>
        )}
        {isEditMode && (
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-3 md:gap-6">
            <Input
              onChange={ev => dispatch(handleRuleNameChange(ev.target.value))}
              value={selectedRuleset?.name}
              className="h-8 w-full text-xs md:w-1/3"
            />
            <div className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
              <Button onClick={handleSaveChanges}>Save Changes</Button>

              <ConfirmationDialog
                title="Discard Changes?"
                description="Are you sure you want to discard your changes? Any unsaved changes will be lost"
                triggerComponent={<Button variant="secondary">Cancel</Button>}
                confirmationComponent={
                  <Button type="button" variant="destructive" className="bg-redShades-shade1" onClick={handleCancel}>
                    Yes
                  </Button>
                }
              />
              <div className="h-full w-[1px]" />
              <Button variant="success" onClick={handleAddNewRule}>
                Add New Rule
              </Button>
              <Button variant="destructive" onClick={handleDeleteRuleset}>
                Delete Ruleset
              </Button>
            </div>
          </div>
        )}
      </div>

      <Table className="md:table-fixed">
        {(!ruleset.length || !selectedRuleset?.rules?.length) && (
          <TableCaption>No rules are currently defined. Please add some to get started.</TableCaption>
        )}
        <TableHeader className="uppercase">
          <TableRow>
            <TableHead className="w-[100px]"></TableHead>
            <TableHead className="w-[100px]">Rule #</TableHead>
            <TableHead colSpan={3} className="text-center">
              Measurement Condition
            </TableHead>
            <TableHead>Finding Item</TableHead>
            <TableHead>Action</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
            <SortableContext
              items={selectedRuleset?.rules.map(rule => rule.id) || []}
              strategy={verticalListSortingStrategy}>
              {selectedRuleset?.rules.map(rule => (
                <SortableItem id={rule.id} key={rule.id} data={{ row: true }}>
                  <TableCell className="w-[100px]">
                    <Icon color="#B4B4C3" icon="ci:drag-vertical" width="24" height="24" cursor="grab" />
                  </TableCell>
                  <TableCell className="font-medium">{rule.id}</TableCell>
                  <TableCell>
                    {editingRuleId === rule.id ? (
                      <Input
                        placeholder="Enter Measurement Name"
                        className="h-8"
                        value={rule.measurement}
                        onPointerDown={e => e.stopPropagation()}
                        onChange={e =>
                          dispatch(
                            handleRuleFieldChange({ ruleId: rule.id, field: 'measurement', value: e.target.value })
                          )
                        }
                      />
                    ) : (
                      rule.measurement
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRuleId === rule.id ? (
                      <Select
                        value={rule.comparator}
                        onValueChange={value =>
                          dispatch(handleRuleFieldChange({ ruleId: rule.id, field: 'comparator', value }))
                        }>
                        <SelectTrigger className="h-8 w-full text-xs md:w-1/3">
                          <SelectValue placeholder="Select comparator" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {comparators.map(comparator => (
                              <SelectItem key={comparator} value={comparator} className="text-xs">
                                {comparator}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      rule.comparator
                    )}
                  </TableCell>
                  <TableCell>
                    {rule.comparator === 'is' ? (
                      'Not Present'
                    ) : editingRuleId === rule.id ? (
                      <div className="flex flex-row items-center gap-1">
                        <Input
                          type="number"
                          className="h-8"
                          value={rule.comparedValue}
                          onPointerDown={e => e.stopPropagation()}
                          onChange={e =>
                            dispatch(
                              handleRuleFieldChange({ ruleId: rule.id, field: 'comparedValue', value: e.target.value })
                            )
                          }
                        />
                        <Select
                          value={rule.unitName}
                          onValueChange={value =>
                            dispatch(handleRuleFieldChange({ ruleId: rule.id, field: 'unitName', value }))
                          }>
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue placeholder="Unit" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {units.map(unit => (
                                <SelectItem key={unit} value={unit} className="text-xs">
                                  {unit}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </div>
                    ) : (
                      <span>
                        {rule.comparedValue} {rule?.unitName}
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRuleId === rule.id ? (
                      <Input
                        className="h-8"
                        value={rule.findingName}
                        onPointerDown={e => e.stopPropagation()}
                        onChange={e =>
                          dispatch(
                            handleRuleFieldChange({ ruleId: rule.id, field: 'findingName', value: e.target.value })
                          )
                        }
                      />
                    ) : (
                      rule.findingName
                    )}
                  </TableCell>
                  <TableCell>
                    {editingRuleId === rule.id ? (
                      <Select
                        value={rule.action}
                        onValueChange={value =>
                          dispatch(handleRuleFieldChange({ ruleId: rule.id, field: 'action', value }))
                        }>
                        <SelectTrigger className="h-8 w-[100px] text-xs">
                          <SelectValue placeholder="Select Action" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {ruleActions.map(action => (
                              <SelectItem key={action} value={action} className="text-xs">
                                {action}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      rule.action
                    )}
                  </TableCell>
                  <TableCell className="flex flex-row items-center justify-end gap-2 text-right">
                    {editingRuleId === rule.id ? (
                      <Icon
                        color="#B4B4C3"
                        className="mt-2"
                        cursor="pointer"
                        icon="mingcute:check-fill"
                        width="24"
                        height="24"
                        onMouseDown={handleSaveRowChanges}
                      />
                    ) : (
                      <Icon
                        icon="mdi:pencil"
                        color="#B4B4C3"
                        cursor="pointer"
                        width="24"
                        height="24"
                        onMouseDown={ev => handleEditRule(ev, rule.id)}
                      />
                    )}
                    {editingRuleId === rule.id ? (
                      <Icon
                        color="#B4B4C3"
                        cursor="pointer"
                        className="mt-2"
                        icon="maki:cross"
                        width="20"
                        height="20"
                        onMouseDown={handleResetSelectedRuleset}
                      />
                    ) : (
                      <Icon
                        icon="mdi:trash"
                        color="#B4B4C3"
                        width="24"
                        height="24"
                        cursor="pointer"
                        onMouseDown={ev => handleDeleteRule(ev, rule.id)}
                      />
                    )}
                  </TableCell>
                </SortableItem>
              ))}
            </SortableContext>
          </DndContext>
        </TableBody>
      </Table>
    </div>
  );
};

export default Rules;
