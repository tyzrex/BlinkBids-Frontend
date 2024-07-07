import {
  useCallback,
  useState,
} from 'react';

export type ActionState<TInput, TOutput> = {
  error?: string | null;
  message?: string | null;
  data?: TOutput;
};


type Action<TInput, TOutput> = (data: TInput) => Promise<ActionState<TInput, TOutput>>;

interface UseActionOptions<TOutput> {
  onSuccess?: (data: TOutput) => void;
  onError?: (error: string) => void;
  onComplete?: () => void;
};

export const useAction = <TInput, TOutput> (
  action: Action<TInput, TOutput>,
  options: UseActionOptions<TOutput> = {}
) => {

  const [error, setError] = useState<string | undefined>(undefined);
  const [message, setMessage] = useState<string | undefined>(undefined);
  const [data, setData] = useState<TOutput | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const execute = useCallback(
    async (input: TInput) => {
      setIsLoading(true);

      try {
        const result = await action(input);
        if (!result) {
          return;
        }


        if (result.error && result.message) {
          setError(result.error);
          setMessage(result.message);
          options.onError?.(result.message);
        }

        if (result.data) {
          setData(result.data);
          options.onSuccess?.(result.data);
        }
      }
      catch (e) {
        //console.log(e)
      }
      
      finally {
        setIsLoading(false);
        options.onComplete?.();
      }
    },
    [action, options]
  );

  return {
    execute,
    error,
    data,
    isLoading,
  };
};