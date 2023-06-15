type TListener = (message: IMessage) => void;

export enum EType {
  success = 'success',
  error = 'error',
  regular = 'regular',
}

export interface IMessage {
  id?: number;
  type: EType;
  text: string;
  duration?: number;
}

export default class EventManager {
  listeners: Map<string, TListener[]>;

  constructor() {
    this.listeners = new Map();
  }

  on(event: string, listener: TListener): void {
    if(!this.listeners.has(event)) {
      this.listeners.set(event, []);
    }

    this.listeners.get(event)?.push(listener);
  }

  emit(event: string, payload: IMessage) {
    if(this.listeners.has(event)) {
      this.listeners.get(event)?.forEach(
        (listener) => listener(payload),
      );
    }
  }

  removeListener(event: string, listenerToRemove: TListener): void {
    const listeners = this.listeners.get(event);

    if(listeners) {
      const filteredListeners = listeners.filter(
        (listener) => listener !== listenerToRemove,
      );

      this.listeners.set(event, filteredListeners);
    }
  }
}
