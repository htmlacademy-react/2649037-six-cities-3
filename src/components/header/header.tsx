import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/use-app-dispatch';
import { useAppSelector } from '../../hooks/use-app-selector';
import {
  selectAuthorizationStatus,
  selectUser,
  selectFavoriteCount,
} from '../../store/selectors';
import { AppRoute, AuthorizationStatus, TOKEN_KEY } from '../../const';
import { logout } from '../../store/slices/userSlice';

function Header(): JSX.Element {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const authStatus = useAppSelector(selectAuthorizationStatus);
  const user = useAppSelector(selectUser);
  const favoriteCount = useAppSelector(selectFavoriteCount);

  const isLoginPage = location.pathname === String(AppRoute.Login);

  const handleLogout = (evt: React.MouseEvent) => {
    evt.preventDefault();
    localStorage.removeItem(TOKEN_KEY);
    dispatch(logout());
  };

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link className="header__logo-link" to="/">
              <img
                className="header__logo"
                src="img/logo.svg"
                alt="6 cities logo"
                width="81"
                height="41"
              />
            </Link>
          </div>

          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                {authStatus === AuthorizationStatus.Auth ? (
                  <>
                    <li className="header__nav-item user">
                      <Link
                        className="header__nav-link header__nav-link--profile"
                        to="/favorites"
                      >
                        <div className="header__avatar-wrapper user__avatar-wrapper">
                          <img
                            className="user__avatar"
                            src={user?.avatarUrl || ''}
                            alt="User avatar"
                            width="40"
                            height="40"
                          />
                        </div>
                        <span className="header__user-name user__name">
                          {user?.email || ''}
                        </span>
                        <span className="header__favorite-count">
                          {favoriteCount}
                        </span>
                      </Link>
                    </li>

                    <li className="header__nav-item">
                      <a
                        className="header__nav-link"
                        href="#"
                        onClick={handleLogout}
                      >
                        <span className="header__signout">Sign out</span>
                      </a>
                    </li>
                  </>
                ) : (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to="/login">
                      <span className="header__login">Sign in</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
