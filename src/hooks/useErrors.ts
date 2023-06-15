// React imports
import { useState } from 'react';

interface IError {
  field: string;
  message: string;
}
export default function useErrors() {
  const [errors, setErrors] = useState<IError[]>([]);

  function setError(field: string, message: string): void {
    const errorAlreadyExists = errors.find((error) => error.field === field);

    if(!errorAlreadyExists) {
      setErrors((prevState) => [
        ...prevState,
        {
          field,
          message,
        },
      ]);
    }
  }

  function removeError(field: string): void {
    setErrors((prevState) => prevState.filter(
      (error) => error.field !== field,
    ));
  }

  function getErrorMessageByFieldName(field: string): string | undefined {
    return errors.find((error) => error.field === field)?.message;
  }

  function hasError(field: string): boolean {
    return errors.find((error) => error.field === field) ? true : false;
  }

  return {
    errors,
    setError,
    removeError,
    getErrorMessageByFieldName,
    hasError,
  };
}
