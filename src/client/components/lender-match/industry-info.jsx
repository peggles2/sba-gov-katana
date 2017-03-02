import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, TextArea, SelectBox } from '../helpers/form-helpers.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import { browserHistory } from 'react-router';
import { FormPanel } from '../common/form-styling.jsx'
import { getSelectBoxValidationState } from '../helpers/page-validator-helpers.jsx'
import styles from '../../styles/lender-match/lender-match.scss';
import { Col } from 'react-bootstrap';

class IndustryInfoForm extends React.Component {
  constructor(props) {
    super();
    let industryInfoFields = Object.assign({}, {
      industryType: "",
      industryExperience: "",
    }, props.industryInfoFields);
    let validStates = {};
    if (industryInfoFields.industryType) {
      validStates = Object.assign(validStates, this.getValidationState("industryType", industryInfoFields.industryType));
    }
    if (industryInfoFields.industryExperience) {
      validStates = Object.assign(validStates, this.getValidationState("industryExperience", industryInfoFields.industryExperience));
    }
    this.state = {
      industryInfoFields: industryInfoFields,
      validStates: validStates
    };
  }

  isValidForm() {
    let validForm = true;
    for (var inputState in this.state.validStates) {
      if (this.state.validStates[inputState] === "error" || this.state.validStates[inputState] === null) {
        validForm = false;
      }
    }
    return validForm
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createIndustryInfo(this.state.industryInfoFields);
    browserHistory.push('/linc/form/loan');
    this.industryInfoForm.reset()
  }

  handleChange(e) {
    let industryInfoFields = {};
    industryInfoFields[e.target.name] = e.target.value;
    this.setState({
      industryInfoFields: {
        ...this.state.industryInfoFields,
        ...industryInfoFields
      }
    });
    let validStates = this.getValidationState(e.target.name, e.target.value)
    this.setState({
      validStates: {
        ...this.state.validStates,
        ...validStates
      }
    })
  }

  getValidationState(name, value) {
    return getSelectBoxValidationState(name, value)
  }

  render() {
    return (
      <FormPanel title="What's your industry?" subtitle="Here's why we're asking for this info and how it will help you get a loan.">
        <form ref={ (input) => this.industryInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <SelectBox label="In what industry is your business?" name="industryType" handleChange={ this.handleChange.bind(this) } getValidationState={ this.state.validStates["industryType"] } defaultValue={ this.state.industryInfoFields.industryType }
            autoFocus required>
            <option value="" disabled>- Select use of funds -</option>
            <option value="Advertising/Marketing">Advertising/Marketing</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Automotive/Service Station">Automotive/Service Station</option>
            <option value="Chemical/Pharmaceutical">Chemical/Pharmaceutical</option>
            <option value="Construction">Construction</option>
            <option value="Education">Education</option>
            <option value="Energy">Energy</option>
            <option value="Entertainment/Recreation">Entertainment/Recreation</option>
            <option value="Financial Services">Financial Services</option>
            <option value="Food Services">Food Services</option>
            <option value="Health Care">Health Care</option>
            <option value="Hospitality">Hospitality</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Media">Media</option>
            <option value="Non-Profit">Non-Profit</option>
            <option value="Other">Other</option>
            <option value="Professional Services">Professional Services</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Restaurant/Bar">Restaurant/Bar</option>
            <option value="Retail">Retail</option>
            <option value="Technology">Technology</option>
            <option value="Transportation/Logistics">Transportation/Logistics</option>
          </SelectBox>
          <SelectBox label="What's your experience in this industry?" name="industryExperience" handleChange={ this.handleChange.bind(this) } getValidationState={ this.state.validStates["industryExperience"] } defaultValue={ this.state.industryInfoFields.industryExperience }
            required>
            <option value="" disabled>- Select use of funds -</option>
            <option value="Less than 1 year">Less than 1 year</option>
            <option value="1-2 years">1-2 years</option>
            <option value="2-5 years">2-5 years</option>
            <option value="5+ years">5+ years</option>
          </SelectBox>
          <Col md={ 6 } mdOffset={ 3 }>
          <button className={ styles.continueBtn } type="submit" disabled={ !(this.isValidForm()) }> Continue </button>
          </Col>
        </form>
      </FormPanel>
      );
  }
  ;
}

function mapStateToProps(state) {
  return {
    industryInfoFields: state.lenderMatch.industryInfoData
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(IndustryInfoForm);
