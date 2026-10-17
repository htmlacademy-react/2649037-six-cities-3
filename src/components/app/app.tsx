import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';

import LoginPage from '../../pages/login-page/login-page';
import FavoritesPage from '../../pages/favorites-page/favorites-page';
import OfferPage from '../../pages/offer-page/offer-page';
import NotFoundPage from '../../pages/not-found-page/not-found-page';
import MainPage from '../../pages/main-page/main-page';

import PrivateRoute from '../../components/private-router/private-router';
import Header from '../../components/header/header';
import { AppRoute } from '../../const';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import { fetchOffers, checkAuthStatus } from '../../store/api-actions';
import { selectAuthorizationStatus } from '../../store/selectors';

function App(): JSX.Element {
  const dispatch = useAppDispatch();
  const authStatus = useAppSelector(selectAuthorizationStatus);

  useEffect(() => {
    dispatch(checkAuthStatus());
  }, [dispatch]);

  useEffect(() => {
    dispatch(fetchOffers());
  }, [authStatus, dispatch]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path={AppRoute.Root} element={<MainPage />} />
        <Route path={AppRoute.Login} element={<LoginPage />} />
        <Route
          path={AppRoute.Favorites}
          element={
            <PrivateRoute>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path={AppRoute.Offer} element={<OfferPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
