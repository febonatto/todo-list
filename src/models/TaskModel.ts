export enum EPriority {
  low = 'low',
  medium = 'medium',
  high = 'high',
}

export interface TaskModel {
  id: string;
  name: string;
  priority: EPriority;
  shortDescription: string;
  extensiveDescription: string;
}
