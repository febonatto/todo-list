// Styles imports
import { Container, Content, Header, Overlay } from './styles';

// Components imports
import Button from '../Button';

// Models imports
import { EPriority, TaskModel } from '../../models/TaskModel';

interface IComponentProps {
  visible: boolean;
  task: TaskModel;
  isLoading?: boolean;
  danger?: boolean;
  confirmLabel: string;
  onConfirm: () => void;
  cancelLabel?: string;
  onCancel?: () => void;
}
export default function Modal({
  visible,
  task,
  isLoading,
  danger = false,
  confirmLabel,
  onConfirm,
  cancelLabel,
  onCancel,
}: IComponentProps) {
  if(!visible) {
    return null;
  }

  return (
    <Overlay>
      <Container $danger={danger}>
        <Header $priority={task.priority}>
          <h2>{task.name}</h2>
          <span>
            {task.priority === EPriority.low && 'Baixa'}
            {task.priority === EPriority.medium && 'Média'}
            {task.priority === EPriority.high && 'Alta'}
          </span>
        </Header>
        <Content>
          {danger ? (
            <strong>Tem certeza que deseja realizar a ação? Esta não poderá ser desfeita!</strong>
          ) : (
            <>
              <div className="content-group">
                <span>Breve descrição:</span>
                <p>{task.shortDescription}</p>
              </div>
              <div className="content-group">
                <span>Descrição detalhada:</span>
                <p>{task.extensiveDescription}</p>
              </div>
            </>
          )}
          <div className="actions">
            <Button
              type="button"
              isLoading={isLoading}
              danger={danger}
              disabled={isLoading}
              onClick={onConfirm}
            >
              {confirmLabel}
            </Button>

            {(cancelLabel && onCancel) && (
              <Button
                type="button"
                secondary
                danger={danger}
                disabled={isLoading}
                onClick={onCancel}
              >
                {cancelLabel}
              </Button>
            )}
          </div>
        </Content>
      </Container>
    </Overlay>
  );
}
