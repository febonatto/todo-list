// Models imports
import { TaskModel } from '../models/TaskModel';

// Custom errors imports
import LocalStorageError from '../errors/LocalStorageError';

// Service utils imports
import filterLocalStorageData from './utils/filterLocalStorageData';

// Utils imports
import delay from '../utils/delay';

class LocalStorageService {
  key: string;

  constructor() {
    this.key = 'tasks';
  }

  async listTasks(): Promise<TaskModel[]> {
    try {
      await delay(1000);
      const data = localStorage.getItem(this.key) || '[]';
      const tasks = filterLocalStorageData(data);
      return tasks;
    } catch {
      this.subscribeTasks([]);
      return [];
    }
  }

  async getTaskById(id: string): Promise<TaskModel> {
    const tasks = await this.listTasks();

    const task = tasks.find((task) => task.id === id);
    if(!task) {
      throw new LocalStorageError('Tarefa não encontrada!');
    }

    return task;
  }

  async createTask(task: TaskModel): Promise<void> {
    const tasks = await this.listTasks();
    tasks.push(task);

    this.setTasks(tasks);
  }

  async updateTask(taskToUpdate: TaskModel): Promise<void> {
    const tasks = await this.listTasks();

    const taskIndex = tasks.findIndex((task) => task.id === taskToUpdate.id);
    if(taskIndex < 0) {
      throw new LocalStorageError('Tarefa não encontrada!');
    }

    tasks[taskIndex] = taskToUpdate;
    this.setTasks(tasks);
  }

  async deleteTask(id: string): Promise<void> {
    const tasks = await this.listTasks();

    const taskExists = tasks.find((task) => task.id === id);
    if(!taskExists) {
      throw new LocalStorageError('Tarefa não encontrada!');
    }

    const newTasks = tasks.filter((task) => task.id !== id);
    this.setTasks(newTasks);
  }

  subscribeTasks(tasks: TaskModel[]): void {
    this.setTasks(tasks);
  }

  setTasks(tasks: TaskModel[]): void {
    localStorage.setItem(this.key, JSON.stringify(tasks));
  }
}

export default new LocalStorageService();
