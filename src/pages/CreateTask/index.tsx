// Components imports
import TaskForm from '../../components/TaskForm';

// Lib imports
import { EType } from '../../lib/EventManager';

// Models imports
import { TaskModel } from '../../models/TaskModel';

// Services imports
import LocalStorageService from '../../services/LocalStorageService';

// Utils imports
import toast from '../../utils/toast';

export default function CreateTask() {
  async function handleSubmit(task: TaskModel): Promise<void> {
    try {
      await LocalStorageService.createTask(task);

      toast({
        type: EType.success,
        text: 'Tarefa cadastrada com sucesso!',
      });
    } catch {
      toast({
        type: EType.error,
        text: 'Ocorreu um erro ao cadastrar a tarefa!'
      });
    }
  }

  return (
    <TaskForm
      title="Criar nova tarefa"
      buttonLabel="Cadastrar"
      onSubmit={handleSubmit}
    />
  );
}
