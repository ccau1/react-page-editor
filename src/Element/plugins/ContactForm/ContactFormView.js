import React from 'react';
import {NonNullTextField as TextField, Button} from '../../../layoutElements';

export default class ContactFormView extends React.Component {
  constructor(props: Object): void {
    super(props);
    this.state = {
      form: this.initState(props),
      showMsg: false,
      isSuccess: false,
      message: ''
    };
  }

  initState(props) {
    const {model: {val}} = props || this.props;
    return {
      from: '',
      name: '',
      to: val.to,
      subject: '',
      body: ''
    };
  }

  onContentChange = name => (newValue: string, event: Object) => {
    this.setState({
      form: {
        ...this.state.form,
        [name]: newValue
      }
    });
  };

  onSend(ev) {
    const {model: {val}} = this.props;
    this.setState({
      showMsg: false
    });

    let mailForm = {...this.state.form};
    mailForm.from = {
      name: mailForm.name,
      address: mailForm.from
    };
    mailForm.subject = val.subjectPrefix + '::' + mailForm.subject;
    mailForm.body = `
      Name: ${this.state.form.name},
      Email: ${this.state.form.from}

      ${this.state.form.body}
    `;

    fetch(val.api, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': 'en'
      },
      body: JSON.stringify(mailForm)
    }).then(response => {
      if (response.status >= 400) {
        return response.json().then(err => {
          throw err;
        });
      } else {
        this.setState({
          form: this.initState(),
          showMsg: true,
          isSuccess: true,
          message: 'We\'ve received your message and will get in touch with you soon!'
        });
      }
    }).catch(err => {
      console.log('err', err);
      this.setState({
        showMsg: true,
        isSuccess: false,
        message: err._error
      });
    });
  }

  render() {
    const {form, showMsg, isSuccess, message} = this.state;
    const fields = [
      {
        name: 'name',
        text: 'Your Name'
      },
      {
        name: 'from',
        text: 'Your E-mail'
      },
      {
        name: 'subject',
        text: 'What is on your mind?'
      }
    ];

    return (
      <form>
        {fields.map((field, item) => {
          return (
            <div key={field.name + ' ' + item}>
              <TextField
                value={form[field.name]}
                onChange={this.onContentChange(field.name)}
                name={field.name}
                type="text"
                floatingLabelText={field.text}
              />
            </div>
          );
        })}

        <div>
          <TextField
            value={form.body}
            onChange={this.onContentChange('body')}
            rows={4}
            multiLine
            floatingLabelText={'Please, don\'t spare any details!'}
          />
        </div>
        {showMsg && <div style={isSuccess ? styles.successMsg : styles.failMsg}>
          {message}
        </div>}
        <Button.Primary onTouchTap={this.onSend.bind(this)} primary={true} label="Send" />
      </form>
    );
  }
}

const styles = {
  successMsg: {
    color: 'green'
  },
  failMsg: {
    color: 'red'
  }
};
