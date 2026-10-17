import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { selectError } from '../../store/selectors';
import { clearError } from '../../store/slices/dataSlice';
import './server-error.css';

function ServerError(): JSX.Element | null {
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectError);

  if (!error) {
    return null;
  }

  return (
    <div className="server-error" role="alert">
      <span>{error}</span>
      <button
        type="button"
        className="server-error__close"
        onClick={() => dispatch(clearError())}
        aria-label="Закрыть"
      >
        ✕
      </button>
    </div>
  );
}

export default ServerError;
