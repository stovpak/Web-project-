import React, { useState } from 'react';
import './styled.css';
import { redirectToUrl } from 'utils/baseAPI';
import { useSelector } from 'react-redux';
import UserLabel from 'components/UserName/userLabel';
import UnAuthorized from 'components/AlertWindow/UnAuthorized';
import { LabelStyle, MenuItemStyle } from '../Material UI/materialStyle';
import { getUsernameFromCookies } from '../../utils/cookies';

const NavBar = () => {
  const { isAuth } = useSelector(state => state.user);
  const [isOpenModal, setIsOpenModal] = useState(null);

  const addTopic = () => {
    if (!isAuth) {
      setIsOpenModal(true);
    } else {
      redirectToUrl('topics/create-topic');
    }
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  return (
    <div>
      {isOpenModal && <UnAuthorized open={true} handleClose={handleClose} />}
      <nav className="navbar navbar-expand-md bg-dark navbar-dark  d-flex justify-content-end">
        <a className="navbar-brand " href="#">
          AvtoForum
        </a>
        <button
          className="navbar-toggler desktop-hide navbar-label-username"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
          style={LabelStyle}
        >
          {getUsernameFromCookies()}
        </button>
        <button
          className="navbar-toggler mobile-hide"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavbar"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavbar">
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item active">
              <a className="nav-link" href="/topics">
                Главная
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                <button
                  name="addTopic"
                  type="button"
                  className="ml-auto btn btn-warning m-50 nav-button"
                  onClick={addTopic}
                >
                  Добавить тему
                </button>
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => redirectToUrl('user/profile')}
              >
                Профиль
              </a>
            </li>
            <li className="nav-item active">
              <a
                className="nav-link"
                onClick={() => redirectToUrl('topics/my-topics')}
              >
                Мои темы
              </a>
            </li>
            <li style={MenuItemStyle} className="nav-link active">
              <a
                className="nav-link"
                onClick={() => redirectToUrl('topics/my-topics')}
              >
                Выйти
              </a>
            </li>
          </ul>
          <ul className="navbar-nav navbar-align w-25 mobile-hide">
            <li className="nav-item">
              <a className="nav-link" href="#">
                <UserLabel />
              </a>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
