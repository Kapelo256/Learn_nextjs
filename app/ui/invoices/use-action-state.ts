import { useState } from 'react';

type State = {
  message: string | null;
  errors: Record<string, any>;
};

type ActionStateHook = [
  state: State,
  handleSubmit: (formData: FormData) => Promise<void>
];

function useActionState(
  updateInvoiceWithId: (formData: FormData) => Promise<void>,
  initialState: State
): ActionStateHook {
  const [state, setState] = useState<State>(initialState);

  const handleSubmit = async (formData: FormData) => {
    try {
      await updateInvoiceWithId(formData);
      setState({ message: 'Invoice updated successfully!', errors: {} });
    } catch (error) {
      setState({ message: null, errors: error });
    }
  };

  return [state, handleSubmit];
}

export default useActionState;
