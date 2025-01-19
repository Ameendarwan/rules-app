export interface Rule {
  id: number;
  unitName?: string;
  findingName: string;
  comparator: string;
  measurement: string;
  comparedValue: number | string;
  action: string;
}

export interface RuleSet {
  id: number;
  name: string;
  rules: Rule[];
}
