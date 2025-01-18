export interface Rule {
  id: number;
  unitName?: string;
  findingName: string;
  comparator: string;
  measurement: string;
  comparedValue: number | string;
  action: string;
  isNew?: boolean;
}

export interface RuleSet {
  id: number;
  name: string;
  rules: Rule[];
}
