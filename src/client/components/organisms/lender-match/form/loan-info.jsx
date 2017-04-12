import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {includes, map, pickBy, keys} from "lodash";

import * as LenderMatchActions from '../../../../actions/lender-match.js';
import * as LocationChangeActions from '../../../../actions/location-change.js';
import {getSelectBoxValidationState, getCurrencyValidationState, containsErrorOrNull, getTextAlphanumeicValidationState} from '../../../../services/page-validator-helpers.js'
import clientConfig from "../../../../services/config.js";
import {logEvent} from "../../../../services/analytics.js";

import styles from './lender-match.scss';
import TextInput from '../../../atoms/text-input.jsx';
import TextArea from "../../../atoms/textarea.jsx";
import MultiSelectBox from '../../../atoms/multiselect.jsx';

class LoanInfo extends React.Component {
  constructor(props) {
    super();
    let initialData = props.loanFields || {};
    this.state = {
      loanAmount: initialData.loanAmount || "",
      loanDescription: initialData.loanDescription || "",
      loanUsage: initialData.loanUsage || "",
      validStates: {
        loanAmount: null,
        loanDescription: null,
        loanUsage: null
      }
    };
  }

  componentDidMount() {
    this.validateFields(["loanAmount", "loanDescription", "loanUsage"]);
    window.scrollTo(0, 0);
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    let validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null);
    if(validationState[name] === "error"){
      logEvent({"category": "Lender Match Form", "action": "Error Event", "label": name});
    }
    return validationState;
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates;
    if (includes(fields, "loanAmount")) {
      validStates = Object.assign(validStates, this.validateSingleField(this.getLoanAmountValidationState, "loanAmount", defaultWhenNotSuccessful));
    }
    if (includes(fields, "loanUsage")) {
      validStates = Object.assign(validStates, this.validateSingleField(getSelectBoxValidationState, "loanUsage", defaultWhenNotSuccessful));
    }
    if (includes(fields, "loanDescription")) {
      validStates = Object.assign(validStates, this.validateSingleField(getTextAlphanumeicValidationState, "loanDescription", defaultWhenNotSuccessful));
    }
    this.setState({validStates: validStates});
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates);
  }

  getLoanAmountValidationState(name, value, defaultWhenNotSuccessful) {
    let validFormat = getCurrencyValidationState(name, value, defaultWhenNotSuccessful);
    let amountWithoutCommas = value.replace(/(\$|,)/g, "");
    let validAmount = Number(amountWithoutCommas) > 499;
    let valid = validFormat[name] === 'success' && validAmount ? "success" : defaultWhenNotSuccessful;
    let newState = {};
    newState[name] = valid;
    return newState;
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.createLoan({loanAmount: this.state.loanAmount, loanDescription: this.state.loanDescription, loanUsage: this.state.loanUsage});
    this.props.locationActions.locationChange('/linc/form/additional', {
      action: "Continue Button Pushed",
      label: "/linc/form/loan"
    });
    this.loanForm.reset()
  }

  handleSelectChange(newValue) {
    this.setState({
      loanUsage: newValue
  }, () => this.validateFields(["loanUsage"]));
  }

  handleChange(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name && name === "loanDescription" && value && value.length > 250) {
      value = value.substring(0, 250);
    }
    if (name && name === "loanAmount") {
      let amountWithoutCommas = value.replace(/(\$|,)/g, "");
      if (amountWithoutCommas.length > 9) {
        value = this.state.loanAmount;
      }
    }
    let newState = {};
    newState[name] = value;
    this.setState(newState, () => this.validateFields([name]));
  }

  handleAmountBlur(value, callback) {
    let num = parseInt(value.replace(/(\$|,)/g, ""));
    let correctAmount = "";
    if (Number(num) || num === 0) {
      correctAmount = "$" + num.toLocaleString();
    }
    this.setState({
      loanAmount: correctAmount
    }, callback);
  }

  handleBlur(e) {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "loanAmount") {
      this.handleAmountBlur(value, function() {
        this.validateFields([name], "error");
      });
    } else {
      this.validateFields([name], "error");
    }
  }

  handleFocus(nameOrEvent) {
    let name = nameOrEvent && nameOrEvent.target && nameOrEvent.target.name
      ? nameOrEvent.target.name
      : nameOrEvent;
    logEvent({"category": "Lender Match Form", "action": "Focus Event", "label": name});
  }

  render() {
    let loanUsageOptions = _.map([
      "Buying an Existing Business",
      "Developing a Product",
      "Hiring Employees/Staff",
      "Marketing/Advertising",
      "Opening a New Location ",
      "Other",
      "Participating in Trade Show",
      "Purchasing Equipment",
      "Purchasing Inventory",
      "Purchasing Property",
      "Refinancing/consolidating debt",
      "Remodeling an existing location",
      "Working Capital"
    ], (x) => {
      return {label: x, value: x};
    });

    return (
      <div>
        <form ref={(input) => this.loanForm = input} onSubmit={(e) => this.handleSubmit(e)}>
          <TextInput errorText={clientConfig.messages.validation.invalidLoanAmount} label="How much funding do you need?" name="loanAmount" handleChange={this.handleChange.bind(this)} onBlur={this.handleBlur.bind(this)} value={this.state.loanAmount} getValidationState={this.state.validStates.loanAmount} autoFocus onFocus={this.handleFocus.bind(this)}/>
          <MultiSelectBox errorText={clientConfig.messages.validation.invalidLoanUsage} placeholder="- Select use of funds -" label="How will these funds be used?" name="loanUsage" onChange={this.handleSelectChange.bind(this)} validationState={this.state.validStates.loanUsage} value={this.state.loanUsage} options={loanUsageOptions} maxValues={3} onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}></MultiSelectBox>
          <TextArea errorText={clientConfig.messages.validation.invalidLoanDescription} label="Describe how you plan to use these funds" name="loanDescription" handleChange={this.handleChange.bind(this)} value={this.state.loanDescription} getValidationState={this.state.validStates.loanDescription} placeholder="I plan to purchase a larger oven to double the number of pizzas I can serve in an hour..." onBlur={this.handleBlur.bind(this)} onFocus={this.handleFocus.bind(this)}/>
          <button className={styles.continueBtn} type="submit" disabled={!(this.isValidForm())}>
            CONTINUE
          </button>
        </form>
      </div>
    );
  };
}

function mapReduxStateToProps(reduxState) {
  return {loanFields: reduxState.lenderMatch.loanData};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(LenderMatchActions, dispatch),
    locationActions: bindActionCreators(LocationChangeActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(LoanInfo);