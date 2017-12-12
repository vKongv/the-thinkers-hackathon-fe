import React from 'react';
import {
  Button,
  Form,
  Grid,
  Header,
  Message,
  Segment,
  Icon
} from 'semantic-ui-react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { LOGIN } from 'store/user';

let LoginForm = props => {
  const { handleSubmit } = props;
  return (
    <Form size="large" onSubmit={handleSubmit}>
      <Segment stacked>
        <Form.Input fluid iconPosition="left">
          <Field name="username" component="input" placeholder="username" />
          <Icon name="user" />
        </Form.Input>

        <Form.Input
          fluid
          icon="lock"
          iconPosition="left"
          placeholder="Password"
          type="password"
        />
        <Button color="teal" fluid size="large" type="submit">
          Login
        </Button>
      </Segment>
    </Form>
  );
};

LoginForm = reduxForm({
  form: 'login'
})(LoginForm);

const mapDispatchToProps = (dispatch, reactRouteDom) => {
  return {
    onSubmit: data => {
      dispatch({ type: LOGIN, payload: { ...data } });
      reactRouteDom.history.push('/');
    }
  };
};

const Login = ({ onSubmit }) => {
  return (
    <div className="login-form" style={{ paddingTop: '200px' }}>
      <Grid textAlign="center" verticalAlign="middle">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" color="teal" textAlign="center">
            Log-in to your account
          </Header>
          <LoginForm onSubmit={onSubmit} />
          <Message>
            New to us? <a href="#">Sign Up</a>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default withRouter(connect(state => {}, mapDispatchToProps)(Login));