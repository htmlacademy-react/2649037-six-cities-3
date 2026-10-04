import {Navigate} from 'react-router-dom';
import {AppRoute} from '../../const';
import {useAppSelector} from '../../hooks/use-app-selector';
import {Spinner} from '../spinner/spinner';

type PrivateRouteProps = {
  children: JSX.Element;
}

function PrivateRoute(props: PrivateRouteProps): JSX.Element {
  const {children} = props;
  const authorizationStatus = useAppSelector((state) => state.authorizationStatus);

  if (authorizationStatus === 'unknown') {
    return <Spinner />;
  }

  return (
    authorizationStatus === 'authorized'
      ? children
      : <Navigate to={AppRoute.Login} />
  );
}

export default PrivateRoute;
