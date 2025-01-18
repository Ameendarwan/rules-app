import { ChangeEvent, useCallback, useState } from 'react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@app/components/Select/Select';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@app/components/Table/Table';

import { Button } from '@app/components/Button/Button';
import { Icon } from '@iconify/react';
import { Input } from '@app/components/Input/Input';
import { RuleSet } from './types';
import cloneDeep from 'lodash/cloneDeep';
import { mockRuleset } from '@app/mock/data';

const Rules = () => {
  const [ruleset, setRuleset] = useState<RuleSet[]>(cloneDeep(mockRuleset));
  const [selectedRuleset, setSelectedRuleset] = useState<RuleSet | null>(mockRuleset[0]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingRuleId, setEditingRuleId] = useState<number | null>(null);

  const handleSelectRuleset = (rulesetId: number) => {
    let result = ruleset.find(item => item.id === rulesetId);
    if (!!result) setSelectedRuleset(result);
  };

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

  const handleResetSelectedRuleset = () => {
    setEditingRuleId(null);
    if (!!selectedRuleset) {
      let result = ruleset.find(set => set.id === selectedRuleset.id);
      if (!!result) setSelectedRuleset(result);
    }
  };

  const handleCancel = () => {
    setIsEditMode;
    handleResetSelectedRuleset();
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

  const handleEditRule = (ruleId: number) => {
    setEditingRuleId(ruleId);
  };

  const handleEditRuleset = () => {
    setIsEditMode(true);
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

  const handleSaveRowChanges = () => {
    setIsEditMode(false);
    if (!!selectedRuleset) {
      setRuleset(prevState =>
        prevState.map(ruleset => (ruleset.id === selectedRuleset.id ? { ...selectedRuleset } : ruleset))
      );
      setEditingRuleId(null);
    }
  };

  const handleDeleteRuleset = useCallback(() => {
    setRuleset(prevState => {
      const updatedRuleset = prevState.filter(ruleset => ruleset.id !== selectedRuleset?.id);
      setSelectedRuleset(updatedRuleset[0] || null);
      return updatedRuleset;
    });
    setIsEditMode(false);
  }, [selectedRuleset]);

  const handleDeleteRule = (ruleId: number) => {
    if (!selectedRuleset) return;
    const updatedRules = selectedRuleset.rules.filter(rule => rule.id !== ruleId);
    setRuleset(prevState =>
      prevState.map(ruleset => (ruleset.id === selectedRuleset.id ? { ...ruleset, rules: updatedRules } : ruleset))
    );
    setSelectedRuleset({ ...selectedRuleset, rules: updatedRules });
  };

  const handleRuleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSelectedRuleset(prevState => (prevState?.id ? { ...prevState, name: event.target.value } : null));
  };

  const handleRuleFieldChange = (ruleId: number, field: keyof RuleSet['rules'][0], value: string) => {
    if (!selectedRuleset) return;
    const updatedRules = selectedRuleset.rules.map(rule => (rule.id === ruleId ? { ...rule, [field]: value } : rule));
    console.log('UPD', updatedRules);
    setSelectedRuleset(prevState => (prevState ? { ...prevState, rules: updatedRules } : null));
  };

  console.log('SS', selectedRuleset);

  return (
    <div className="flex h-full w-full flex-col sm:p-4 lg:p-10">
      <div className="flex w-full flex-row flex-wrap items-center justify-between gap-4 py-4 max-sm:flex-col max-sm:px-4">
        {!isEditMode && (
          <div className="flex w-full flex-row flex-wrap items-center justify-between gap-2 md:gap-6">
            <Select value={`${selectedRuleset?.id}`} onValueChange={value => handleSelectRuleset(Number(value))}>
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
              onChange={handleRuleNameChange}
              value={selectedRuleset?.name}
              className="h-8 w-full text-xs md:w-1/3"
            />
            <div className="flex flex-row flex-wrap items-center gap-2 md:gap-6">
              <Button onClick={handleSaveChanges}>Save changes</Button>
              <Button variant="secondary" onClick={handleCancel}>
                Cancel
              </Button>
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
          {selectedRuleset?.rules.map(rule => (
            <TableRow key={rule.id}>
              <TableCell className="font-medium">{rule.id}</TableCell>
              <TableCell>
                {editingRuleId === rule.id ? (
                  <Input
                    placeholder="Enter Measurement Name"
                    className="h-8"
                    value={rule.measurement}
                    onChange={e => handleRuleFieldChange(rule.id, 'measurement', e.target.value)}
                  />
                ) : (
                  rule.measurement
                )}
              </TableCell>
              <TableCell>
                {editingRuleId === rule.id ? (
                  <Select
                    value={rule.comparator}
                    onValueChange={value => handleRuleFieldChange(rule.id, 'comparator', value)}>
                    <SelectTrigger className="h-8 w-full text-xs md:w-1/3">
                      <SelectValue placeholder="Select comparator" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {['is', '>=', '<'].map(comparator => (
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
                      onChange={e => handleRuleFieldChange(rule.id, 'comparedValue', e.target.value)}
                    />
                    <Select
                      value={rule.unitName}
                      onValueChange={value => handleRuleFieldChange(rule.id, 'unitName', value)}>
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="Unit" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {['ms', 'sd', 'lg', 'fm'].map(unit => (
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
                    onChange={e => handleRuleFieldChange(rule.id, 'findingName', e.target.value)}
                  />
                ) : (
                  rule.findingName
                )}
              </TableCell>
              <TableCell>
                {editingRuleId === rule.id ? (
                  <Select value={rule.action} onValueChange={value => handleRuleFieldChange(rule.id, 'action', value)}>
                    <SelectTrigger className="h-8 w-[100px] text-xs">
                      <SelectValue placeholder="Select Action" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {['Normal', 'Reflux'].map(action => (
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
                    onClick={handleSaveRowChanges}
                  />
                ) : (
                  <Icon
                    icon="mdi:pencil"
                    color="#B4B4C3"
                    cursor="pointer"
                    width="24"
                    height="24"
                    onClick={() => handleEditRule(rule.id)}
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
                    onClick={handleResetSelectedRuleset}
                  />
                ) : (
                  <Icon
                    icon="mdi:trash"
                    color="#B4B4C3"
                    width="24"
                    height="24"
                    cursor="pointer"
                    onClick={() => handleDeleteRule(rule.id)}
                  />
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Rules;
