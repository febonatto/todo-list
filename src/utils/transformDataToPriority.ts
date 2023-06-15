// Models imports
import { EPriority } from '../models/TaskModel';

export default function transformDataToPriority(data: string): EPriority | undefined {
  if(data in EPriority) {
    return data as unknown as EPriority;
  }
}
