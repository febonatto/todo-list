import EventManager, { IMessage } from '../lib/EventManager';

export const toastEventManager = new EventManager();

export default function toast(message: IMessage): void {
  toastEventManager.emit('addtoast', message);
}
