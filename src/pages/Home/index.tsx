// React imports
import { useEffect, useState, useMemo, useCallback, ChangeEvent } from 'react';

// React router imports
import { Link } from 'react-router-dom';

// Phosphor icons imports
import { Trash, NotePencil, SmileyXEyes, MagnifyingGlass, FolderNotchMinus } from '@phosphor-icons/react';

// Styles imports
import { Card, ErrorContainer, Header, InputSearch, SearchNotFoundContainer, EmptyListContainer } from './styles';

// Components imports
import Button from '../../components/Button';
import Loader from '../../components/Loader';
import Modal from '../../components/Modal';

// Libs imports
import { EType } from '../../lib/EventManager';

// Models imports
import { EPriority, TaskModel } from '../../models/TaskModel';

// Services imports
import LocalStorageService from '../../services/LocalStorageService';

// Utils imports
import toast from '../../utils/toast';

export default function Home() {
  const [tasks, setTasks] = useState<TaskModel[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);
  const [taskBeingInspected, setTaskBeingInspected] = useState<TaskModel | null>(null);
  const [taskBeingDeleted, setTaskBeingDeleted] = useState<TaskModel | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);

  const filteredTasks = useMemo(() => tasks.filter(
    (task) => task.name.toLowerCase().includes(searchTerm.toLowerCase())
  ), [tasks, searchTerm]);

  const loadTasks = useCallback(async () => {
    try {
      setIsLoading(true);

      const tasksList = await LocalStorageService.listTasks();
      setTasks(tasksList);
      setHasError(false);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  function handleTryAgain(): void {
    loadTasks();
  }

  function handleSearchTerm(event: ChangeEvent<HTMLInputElement>): void {
    const { value } = event.target;
    setSearchTerm(value);
  }

  function handleInspectTask(task: TaskModel): void {
    setTaskBeingInspected(task);
    setIsModalVisible(true);
  }

  function handleDeleteTask(task: TaskModel): void {
    setTaskBeingDeleted(task);
    setIsModalVisible(true);
  }

  async function handleConfirmDeleteTask(): Promise<void> {
    try {
      setIsLoadingDelete(true);

      if(taskBeingDeleted) {
        await LocalStorageService.deleteTask('');

        setTasks((prevState) => prevState.filter(
          (task) => task.id !== taskBeingDeleted.id,
        ));

        handleCloseModal();

        toast({
          type: EType.success,
          text: 'Tarefa deletada com sucesso!',
        });
      }
    } catch {
      toast({
        type: EType.error,
        text: 'Ocorreu um erro ao deletar a tarefa!',
      });
    } finally {
      setIsLoadingDelete(false);
    }
  }

  function handleCloseModal(): void {
    setTaskBeingInspected(null);
    setTaskBeingDeleted(null);
    setIsModalVisible(false);
  }

  return (
    <>
      <Loader visible={isLoading} />

      {taskBeingInspected && (
        <Modal
          visible={isModalVisible}
          task={taskBeingInspected}
          confirmLabel="Fechar"
          onConfirm={handleCloseModal}
        />
      )}

      {taskBeingDeleted && (
        <Modal
          visible={isModalVisible}
          task={taskBeingDeleted}
          isLoading={isLoadingDelete}
          danger
          confirmLabel="Deletar"
          onConfirm={handleConfirmDeleteTask}
          cancelLabel="Fechar"
          onCancel={handleCloseModal}
        />
      )}

      {!isLoading && (
        <>
          {hasError && (
            <ErrorContainer>
              <SmileyXEyes size={172} weight="thin" color="#CB1D00" />
              <strong>
                Algo deu errado ao buscar as suas tarefas! Porém, não
                se preocupe, estamos fazendo de tudo para voltar a normalidade.
              </strong>
              <Button
                type="button"
                onClick={handleTryAgain}
              >
                Tentar novamente
              </Button>
            </ErrorContainer>
          )}

          {!hasError && (
            <>
              <Header $justifyContent={tasks.length > 0 ? 'space-between' : 'center'}>
                {tasks.length > 0 && (
                  <strong>
                    {filteredTasks.length}
                    {' '}
                    {filteredTasks.length === 1 ? 'tarefa' : 'tarefas'}
                  </strong>
                )}
                <Link to="/create-task">
                  <Button>
                    Nova tarefa
                  </Button>
                </Link>
              </Header>

              {tasks.length === 0 && (
                <EmptyListContainer>
                  <FolderNotchMinus size={172} weight="thin" color="#8A2BE2" />
                  <strong>
                    Você ainda não tem nenhuma tarefa cadastrada. Clique no botão
                    {' '}
                    <span>&quot;Nova tarefa&quot;</span>
                    {' '}
                    para cadastrar a sua primeira.
                  </strong>
                </EmptyListContainer>
              )}

              {tasks.length > 0 && (
                <InputSearch>
                  <input
                    type="text"
                    placeholder="Pesquisar tarefa por nome..."
                    onChange={handleSearchTerm}
                  />
                </InputSearch>
              )}

              {(tasks.length > 0 && filteredTasks.length === 0) && (
                <SearchNotFoundContainer>
                  <MagnifyingGlass size={172} weight="thin" color="#8A2BE2" />
                  <strong>
                    Nenhum resultado foi encontrado para o termo
                    {' '}
                    <span>&quot;{searchTerm}&quot;</span>
                    .
                  </strong>
                </SearchNotFoundContainer>
              )}

              {filteredTasks.map((task) => (
                <Card key={task.id} $priority={task.priority}>
                  <div className="header">
                    <strong onClick={() => handleInspectTask(task)}>{task.name}</strong>
                    <span>
                      {task.priority === EPriority.low && 'Baixa'}
                      {task.priority === EPriority.medium && 'Média'}
                      {task.priority === EPriority.high && 'Alta'}
                    </span>
                  </div>
                  <div className="content">
                    <p>{task.shortDescription}</p>
                    <div className="actions">
                      <button type="button" onClick={() => handleDeleteTask(task)}>
                        <Trash size={24} color="#CB1D00" />
                      </button>
                      <Link to={`/update-task/${task.id}`}>
                        <button>
                          <NotePencil size={24} color="#2D5DCD" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </>
          )}
        </>
      )}
    </>
  );
}
