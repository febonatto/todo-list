export default class LocalStorageError extends Error {
  public name: string;

  constructor(message: string) {
    super(message);

    this.name = 'LocalStorageError';
  }
}
