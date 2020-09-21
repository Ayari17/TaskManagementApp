import React, { Component } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';

import './SignUpPage.scss';
import { inject } from 'mobx-react';
import ErrorMessage from '../../components/ErrorMessage';

const Heading = styled.h1`
  margin-top: 0;
`;

const FormContainer = styled.div`
  max-width: 480px;
  width: 100%;
  background-color: #edf4ff;
  padding: 30px;
  border-radius: 5px;
`;

const FormField = styled(TextField)`
  width: 100%;
`;

@inject('userStore', 'routerStore')
class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      errorMessage: null,
    };
  }

  submit = async () => {
    const { username, password } = this.state;

    try {
      console.log(this.props);
      await this.props.userStore.signup(username, password);
      this.props.routerStore.push('/signin');
    } catch (error) {
      console.log(error);
      const errorMessage = error.response.data.message;
      this.setState({ errorMessage });
    }
  };

  render() {
    const { errorMessage } = this.state;

    return (
      <div className="fullscreen-wrapper">
        <FormContainer>
          <Heading>Join us!</Heading>
          <p>Start managing tasks easily.</p>

          {errorMessage && <ErrorMessage message={this.state.errorMessage} />}

          <div>
            <FormField
              id="outlined-name"
              label="Username"
              margin="dense"
              variant="outlined"
              onChange={e => this.setState({ username: e.target.value })}
            />
          </div>
          <div>
            <FormField
              id="outlined-name"
              label="Password"
              margin="dense"
              variant="outlined"
              type="password"
              onChange={e => this.setState({ password: e.target.value })}
            />
          </div>
          <div className="text-muted" >Loading may take some Time due to bad hosting services...sorry for the inconvenience :( </div>
          <hr/>
          <div>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              onClick={this.submit}
            >
              SIGN UP
            </Button>
          </div>
        </FormContainer>
      </div>
    );
  }
}

export default SignUpPage;
