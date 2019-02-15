import React from 'react';
import axios from 'axios';
import Auth from '../../../util/Auth';
import LoginModal from '../components/LoginModal.jsx';

class LoginContainer extends React.Component {

  /**
   * Class constructor.
   */
  constructor(props, context) {
    super(props, context);

    const storedMessage = localStorage.getItem('successMessage');
    let successMessage = '';

    if (storedMessage) {
      successMessage = storedMessage;
      localStorage.removeItem('successMessage');
    }

    // set the initial component state
    this.state = {
      errors: {},
      successMessage,
      user: {
        email: '',
        password: ''
      }
    };

    this.processForm = this.processForm.bind(this);
    this.changeUser = this.changeUser.bind(this);
  }

  /**
   * Process the form.
   *
   * @param {object} event - the JavaScript event object
   */
  processForm(event) {
    // prevent default action. in this case, action is the form submission event
    event.preventDefault();

    // create a string for an HTTP body message
    const formData = { email: this.state.user.email, password: this.state.user.password };

    axios.post('/auth/login', formData)
      .then(res => {
        console.log(res);
        if (res.status === 200) {
          this.setState({ errors: {} });
          Auth.authenticateUser(res.data.token);
          this.props.toggleAuthenticateStatus();
          // localStorage.setItem("user", res.data.user.name);
          // this.props.history.push('/dashboard'); // ?
        }
        else { }
      }).catch(err => { console.log(err) })
  }

  /**
   * Change the user object.
   *
   * @param {object} event - the JavaScript event object
   */
  changeUser(event) {
    const field = event.target.name;
    const user = this.state.user;
    user[field] = event.target.value;

    this.setState({
      user
    });
  }

  /**
   * Render the component.
   */
  render() {
    return (
      <LoginModal
        onSubmit={this.processForm}
        onChange={this.changeUser}
        errors={this.state.errors}
        successMessage={this.state.successMessage}
        user={this.state.user}
        show={this.props.show}
        hide={this.props.hide}
      />
    );
  }

}

export default LoginContainer;
