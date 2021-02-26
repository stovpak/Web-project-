import React from 'react';
import { getJwt } from '../../utils/cookies';
import NavBar from '../NavBar/NavBar';
import AuthApi from '../../utils/authApi';
import { EmailChanges } from '../../utils/cookies';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './updateInfoUser.css';
import Index from '../ErrorIndicator';

const ChangeUserEmail = () => {
  const token = getJwt();

  const formik = useFormik({
    initialValues: {
      email: '',
      errorMessage: '',
    },

    validationSchema: Yup.object({
      email: Yup.string()
        .email('Почта введена неправильно')
        .required('Поле не должно быть пустым'),
    }),

    onSubmit: values => {
      EmailChanges.email = values.email;
      AuthApi.updateEmail(EmailChanges, token)
        .then(res => {
          values.errorMessage = 'Почта была успешно измененна';
        })
        .catch(err => {
          if (err.request.status === 400) {
            values.errorMessage = 'Проверьте правильность ввода данных';
          } else if (err.request.status >= 500) {
            return <Index />;
          }
        });
    },
  });

  return (
    <div>
      <NavBar />
      <div>
        <h1 className="container text-center">Почта</h1>
        <ul className="list-group container col-4">
          <li className="list-group-item bg-dark text-center text-white">
            Изменение почты
          </li>
          <li className="list-group-item">
            Ведите почту
            <input
              className="form-control"
              type="text"
              name="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            <p className="text-danger font-italic position-fixed small-text">
              {formik.touched.email && formik.errors.email ? (
                <div>{formik.errors.email}</div>
              ) : null}
            </p>
            <div>
              <button
                className="btn btn-dark mt-2 float-right"
                onClick={e => this.onClick(e)}
              >
                Изменить
              </button>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default ChangeUserEmail;
