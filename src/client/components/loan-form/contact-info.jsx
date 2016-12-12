import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, ValidTextInput } from '../helpers/form-helpers.jsx'
import { FormPanel } from '../common/form-styling.jsx'
import * as ContactInfoActions from '../../actions/contact-info.js'
import { browserHistory } from 'react-router';

import { getNameValidationState, getPhoneValidationState, getEmailValidationState } from '../helpers/page-validator-helpers.jsx'


class ContactInfoForm extends React.Component {
    constructor(){
        super();
        this.state ={
            contactInfoFields: {
                contactPhoneNumber: ""
            },
            validStates: {
                "contactFullName": null,
                "contactPhoneNumber": null,
                "contactEmailAddress": null
            }
        }
    };

    isValidForm(){
        let validForm = true;
        for (var inputState in this.state.validStates){
            if(this.state.validStates[inputState] === "error" || this.state.validStates[inputState] === null){
                validForm = false;
            }
        }
        return validForm
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.actions.createContactInfo(this.state.contactInfoFields);
        browserHistory.push('/form/business');
        this.contactInfoForm.reset();
    };

    handleChange(e){
        let contactInfoFields = {};
        contactInfoFields[e.target.name] = e.target.value;
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        this.getValidationState(e);
    };

    handlePhoneChange(e){
        let contactInfoFields = {};
        let phoneNumber = e.target.value.replace(/[\D]/g,"");
        contactInfoFields[e.target.name] = phoneNumber
        this.setState({contactInfoFields: {...this.state.contactInfoFields, ...contactInfoFields}});
        this.getValidationState(e);
    }

    getValidationState(e) {
        let validStates = {}
        if (e.target.name === "contactFullName") {
            validStates = getNameValidationState(e)
        } else if (e.target.name === "contactPhoneNumber") {
            validStates = getPhoneValidationState(e)
        } else if (e.target.name === "contactEmailAddress") {
            validStates = getEmailValidationState(e)
        }
        this.setState({validStates: {...this.state.validStates, ...validStates}})
    };

    render() {
        return (
            <FormPanel title="How do we reach you?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
                <form ref={(input) => this.contactInfoForm = input} onSubmit={(e) => this.handleSubmit(e)}>
                    <TextInput     label="What is your full name?"
                                   name="contactFullName"
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.validStates["contactFullName"]}
                                   required
                    />

                    <TextInput     label="What is your phone number?"
                                   name="contactPhoneNumber"
                                   handleChange={this.handlePhoneChange.bind(this)}
                                   value={this.state.contactInfoFields.contactPhoneNumber}
                                   getValidationState={this.state.validStates["contactPhoneNumber"]}
                                   required
                    />

                    <TextInput     label="What is your email address?"
                                   name="contactEmailAddress"
                                   handleChange={this.handleChange.bind(this)}
                                   getValidationState={this.state.validStates["contactEmailAddress"]}
                                   required
                    />
                    <button className="btn btn-default col-xs-2 col-xs-offset-5"
                            type="submit"
                            disabled={!(this.isValidForm())}
                    > Continue </button>
                </form>
            </FormPanel>
        );
    };
}

function mapStateToProps(state) {
    return {
        contactInfoData: state.contactInfoData
    };
}

function mapDispatchToProps(dispatch){
    return {
        actions: bindActionCreators(ContactInfoActions, dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ContactInfoForm);
