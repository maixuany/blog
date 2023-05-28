import React, { useState, useRef, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Form, {
  Item,
  Label,
  ButtonItem,
  ButtonOptions,
  RequiredRule,
  EmailRule
} from 'devextreme-react/form';
import LoadIndicator from 'devextreme-react/load-indicator';
import notify from 'devextreme/ui/notify';

import './LoginForm.scss';
import Axios from 'axios';
import Cookies from 'js-cookie';

export default function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const formData = useRef({ email: '', password: '' });

  async function onSubmit(e) {
    try {
      e.preventDefault();
      const { email, password } = formData.current;
      setLoading(true);

      const data = JSON.stringify({
        "email": email,
        "password": password
      });

      const config = {
        method: 'post',
        maxBodyLength: Infinity,
        url: 'http://localhost:3030/api/v1/auth/login',
        headers: {
          'Content-Type': 'application/json'
        },
        data: data
      };

      const result = await Axios.request(config);
      console.log(result)
      if (result.status !== 200) {
        setLoading(false);
        notify(result.data.message, 'error', 2000);
      } else {
        Cookies.set('token', result.data.data);
        notify(result.data.message, 'success', 2000);
        setLoading(false);
      }
    } catch (err) {
      setLoading(false);
      notify("Incorrect email or password", 'error', 2000);
    }
  };

  const onCreateAccountClick = useCallback(() => {
    navigate('/create-account');
  }, [navigate]);

  return (
    <form className={'login-form'} onSubmit={onSubmit}>
      <Form formData={formData.current} disabled={loading}>
        <Item
          dataField={'email'}
          editorType={'dxTextBox'}
          editorOptions={emailEditorOptions}
        >
          <RequiredRule message="Email is required" />
          <EmailRule message="Email is invalid" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'password'}
          editorType={'dxTextBox'}
          editorOptions={passwordEditorOptions}
        >
          <RequiredRule message="Password is required" />
          <Label visible={false} />
        </Item>
        <Item
          dataField={'rememberMe'}
          editorType={'dxCheckBox'}
          editorOptions={rememberMeEditorOptions}
        >
          <Label visible={false} />
        </Item>
        <ButtonItem>
          <ButtonOptions
            width={'100%'}
            type={'default'}
            useSubmitBehavior={true}
          >
            <span className="dx-button-text">
              {
                loading
                  ? <LoadIndicator width={'24px'} height={'24px'} visible={true} />
                  : 'Sign In'
              }
            </span>
          </ButtonOptions>
        </ButtonItem>
        <Item>
          <div className={'link'}>
            <Link to={'/reset-password'}>Forgot password?</Link>
          </div>
        </Item>
        <ButtonItem>
          <ButtonOptions
            text={'Create an account'}
            width={'100%'}
            onClick={onCreateAccountClick}
          />
        </ButtonItem>
      </Form>
    </form>
  );
}

const emailEditorOptions = { stylingMode: 'filled', placeholder: 'Email', mode: 'email' };
const passwordEditorOptions = { stylingMode: 'filled', placeholder: 'Password', mode: 'password' };
const rememberMeEditorOptions = { text: 'Remember me', elementAttr: { class: 'form-text' } };
