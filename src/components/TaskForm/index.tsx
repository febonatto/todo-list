// React imports
import { ChangeEvent, FormEvent, useState } from 'react';

// React router imports
import { Link } from 'react-router-dom';

// Phosphor icons imports
import { ArrowLeft } from '@phosphor-icons/react';

// Styles imports
import { Form, FormContainer, FormGroup, Header } from './styles';

// uuid imports
import { v4 } from 'uuid';

// Components imports
import Button from '../Button';

// Custom hooks imports
import useErrors from '../../hooks/useErrors';

// Models imports
import { TaskModel, EPriority } from '../../models/TaskModel';

// Utils imports
import transformDataToPriority from '../../utils/transformDataToPriority';

interface IComponentProps {
  title: string;
  buttonLabel: string;
  onSubmit: (task: TaskModel) => Promise<void>;

  // Optional props
  task?: TaskModel;
  isLoading?: boolean;
}
export default function TaskForm({
  title,
  buttonLabel,
  onSubmit,
  task,
  isLoading,
}: IComponentProps) {
  const [name, setName] = useState<string>(task?.name ?? '');
  const [priority, setPriority] = useState<EPriority>(task?.priority ?? EPriority.low);
  const [shortDescription, setShortDescription] = useState<string>(task?.shortDescription ?? '');
  const [extensiveDescription, setExtensiveDescription] = useState<string>(task?.extensiveDescription ?? '');
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);

  const {
    errors, setError, removeError, getErrorMessageByFieldName, hasError
  } = useErrors();

  const isFormValid = (name && shortDescription && extensiveDescription && errors.length === 0);
  const isFormEdit = (!!task);

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setName(value);

    value
      ? removeError('name')
      : setError('name', 'O campo "Nome" é obrigatório');
  }

  function handlePriorityChange(event: ChangeEvent<HTMLSelectElement>) {
    const { value } = event.target;

    const transformedValue = transformDataToPriority(value);
    if(transformedValue) {
      setPriority(transformedValue);
    }
  }

  function handleShortDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;
    setShortDescription(value);

    value
      ? removeError('short-description')
      : setError('short-description', 'O campo "Breve descrição" é obrigatório!');
  }

  function handleExtensiveDescriptionChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { value } = event.target;
    setExtensiveDescription(value);

    value
      ? removeError('extensive-description')
      : setError('extensive-description', 'O campo "Descrição detalhada" éobrigatório!');
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setIsSubmiting(true);

    const formTask: TaskModel = {
      id: isFormEdit ? task.id : v4(),
      name,
      priority,
      shortDescription,
      extensiveDescription,
    };
    await onSubmit(formTask);

    setIsSubmiting(false);

    if(!isFormEdit) {
      resetFields();
    }
  }

  function resetFields() {
    setName('');
    setPriority(EPriority.low);
    setShortDescription('');
    setExtensiveDescription('');
  }

  return (
    <FormContainer>
      <Header>
        <Link to="/">
          <ArrowLeft size={32} color="#8A2BE2" />
        </Link>
        <h2>{title}</h2>
      </Header>
      <Form onSubmit={handleSubmit}>
        <FormGroup $error={hasError('name')}>
          <label htmlFor="name">
            Nome
            <input
              id="name"
              type="text"
              disabled={isSubmiting || isLoading}
              value={name}
              onChange={handleNameChange}
            />
          </label>
          {hasError('name') && (
            <small>{getErrorMessageByFieldName('name')}</small>
          )}
        </FormGroup>
        <FormGroup>
          <label htmlFor="priority">
            Prioridade
            <select
              id="priority"
              value={priority}
              disabled={isSubmiting || isLoading}
              onChange={handlePriorityChange}
            >
              <option value="low" defaultChecked>Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </label>
        </FormGroup>
        <FormGroup $error={hasError('short-description')}>
          <label htmlFor="short-description">
            Breve descrição
            <input
              id="short-description"
              type="text"
              disabled={isSubmiting || isLoading}
              value={shortDescription}
              onChange={handleShortDescriptionChange}
            />
          </label>
          {hasError('short-description') && (
            <small>{getErrorMessageByFieldName('short-description')}</small>
          )}
        </FormGroup>
        <FormGroup $error={hasError('extensive-description')}>
          <label htmlFor="extensive-description">
            Descrição detalhada
            <textarea
              id="extensive-description"
              disabled={isSubmiting || isLoading}
              value={extensiveDescription}
              onChange={handleExtensiveDescriptionChange}
            />
          </label>
          {hasError('extensive-description') && (
            <small>{getErrorMessageByFieldName('extensive-description')}</small>
          )}
        </FormGroup>
        <Button
          type="submit"
          isLoading={isSubmiting}
          disabled={!isFormValid || isSubmiting || isLoading}
        >
          {buttonLabel}
        </Button>
      </Form>
    </FormContainer>
  );
}
