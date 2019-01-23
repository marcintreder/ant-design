/* tslint:disable */
import * as React from 'react';
import Form from '../Form';
// test Form.create on component without own props
class WithoutOwnProps extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      foo: 'bar',
    };
  }
  render() {
    return <div>foo</div>;
  }
}
const WithoutOwnPropsForm = Form.create()(WithoutOwnProps);
<WithoutOwnPropsForm />;
class WithOwnProps extends React.Component {
  constructor() {
    super(...arguments);
    this.state = {
      foo: 'bar',
    };
  }
  render() {
    return <div>foo</div>;
  }
}
const WithOwnPropsForm = Form.create()(WithOwnProps);
<WithOwnPropsForm name="foo" />;
class WithCreateOptions extends React.Component {
  render() {
    return <div>foo</div>;
  }
}
const mapPropsToFields = props => {
  const { username } = props;
  return {
    username: Form.createFormField({ value: username }),
  };
};
const formOptions = { mapPropsToFields };
const WithCreateOptionsForm = Form.create(formOptions)(WithCreateOptions);
<WithCreateOptionsForm username="foo" />;
