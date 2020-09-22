import React, { Component } from "react";
class UserLabel extends Component {
  render() {
    let isAuth;
    if (this.props.name != null) {
      isAuth = (
        <div className="input-group mb-3">
          <button
            className="btn btn-outline-secondary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <p name={this.props.name} className="form-control" />
          </button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="http://localhost:3000/profile">
              Профиль
            </a>
            <div role="separator" className="dropdown-divider"/>
            <a className="dropdown-item" onClick={this.onClick}>
              Выход
            </a>
          </div>
        </div>
      );
    } else {
      isAuth = <button className="btn btn-warning">Войти </button>;
    }
    return <div>{isAuth}</div>;
  }
}

export default UserLabel;