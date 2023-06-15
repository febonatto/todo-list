// React imports
import { useEffect, useState } from 'react';

// React router imports
import { useNavigate, useParams } from 'react-router-dom';

// Components imports
import TaskForm from '../../components/TaskForm';

// Libs imports
import { EType } from '../../lib/EventManager';

// Models imports
import { TaskModel } from '../../models/TaskModel';

// Services imports
import LocalStorageService from '../../services/LocalStorageService';

// Utils imports
import toast from '../../utils/toast';

export default function UpdateTask() {
  const [task, setTask] = useState<TaskModel | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTask() {
      try {
        setIsLoading(true);

        if(id) {
          const task = await LocalStorageService.getTaskById(id);
          setTask(task);
        }
      } catch {
        navigate('/');
        toast({
          type: EType.error,
          text: 'Tarefa não encontrada!',
        });
      } finally {
        setIsLoading(false);
      }
    }

    loadTask();
  }, [id, navigate]);

  async function handleSubmit(taskToUpdate: TaskModel): Promise<void> {
    try {
      await LocalStorageService.updateTask(taskToUpdate);

      setTask(taskToUpdate);

      toast({
        type: EType.success,
        text: 'Tarefa editada com sucesso!',
      });
    } catch {
      toast({
        type: EType.error,
        text: 'Ocorreu um erro ao editar a tarefa!',
      });
    }
  }

  return (
    <TaskForm
      key={task?.id}
      title={isLoading ? 'Carregando...' : 'Editar tarefa existente'}
      buttonLabel="Salvar "
      onSubmit={handleSubmit}
      task={task}
      isLoading={isLoading}
    />
  );
}
