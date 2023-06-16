// Custom errors imports
import LocalStorageError from '../../errors/LocalStorageError';

// Models imports
import { TaskModel } from '../../models/TaskModel';

// Services imports
import LocalStorageService from '../LocalStorageService';

export default function filterLocalStorageData(data: unknown): TaskModel[] {
  if(typeof data !== 'string') {
    throw new LocalStorageError('O valor armazenado no localStorage não está no formado JSON!');
  }

  const parsedData = parseData(data as string);

  if(!Array.isArray(parsedData)) {
    throw new LocalStorageError('O valor armazenado no localStorage não é um Array!');
  }

  type TaskModelKeys = keyof TaskModel;
  const taskModelKeys: TaskModelKeys[] = ['id', 'name', 'priority', 'shortDescription', 'extensiveDescription'];

  const tasks: TaskModel[] = parsedData.filter((item) => {
    if(typeof item === 'object' && !Array.isArray(item) && item !== null) {
      const matchWithTaskModal = taskModelKeys.every((key) => key in item);
      if(matchWithTaskModal) {
        return item;
      }
    }
  });

  LocalStorageService.subscribeTasks(tasks);
  return tasks;
}

function parseData(data: string): unknown {
  try {
    const parsedData = JSON.parse(data);
    return parsedData;
  } catch {
    throw new LocalStorageError('Falha ao realizar o parse dos dados do localStorage!');
  }
}
