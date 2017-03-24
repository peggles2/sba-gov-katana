import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { TextInput, CheckBox } from '../helpers/form-helpers.jsx';
import { FormPanel } from '../common/form-styling.jsx'
import * as LenderMatchActions from '../../actions/lender-match.js';
import { browserHistory } from 'react-router';
import styles from './review-submit.scss'
import ReviewSection from '../helpers/review-page-helpers.jsx';
import { Col } from 'react-bootstrap';


class ReviewSubmitInfoForm extends React.Component {
  constructor() {
    super();
    this.state = {
      reviewSubmitInfoFields: {}
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.actions.matchFormData({
      loanData: this.props.loanData,
      additionalInfoData: this.props.additionalInfoData,
      contactInfoData: this.props.contactInfoData,
      businessInfoData: this.props.businessInfoData,
      industryInfoData: this.props.industryInfoData
    });
    browserHistory.push("/linc/success");
    this.reviewSubmitInfoForm.reset();
  }

  handleChange(e) {
    let reviewSubmitInfoFields = {};
    reviewSubmitInfoFields[e.target.name] = e.target.value;
    this.setState({
      reviewSubmitInfoFields: {
        ...this.state.reviewSubmitInfoFields,
        ...reviewSubmitInfoFields
      }
    });
  }

  handleClick(e) {
    let reviewSubmitInfoFields = {};
    reviewSubmitInfoFields[e.target.name] = e.target.value;
    this.setState({
      reviewSubmitFields: {
        ...this.state.reviewSubmitInfoFields,
        ...reviewSubmitInfoFields
      }
    });
  }

  render() {
    return (
      <div>
        <ContactSection contactInfoData={ this.props.contactInfoData } editPath="/linc/form/contact" />
        <BusinessSection businessInfoData={ this.props.businessInfoData } editPath="/linc/form/business" />
        <IndustrySection industryInfoData={ this.props.industryInfoData } editPath="/linc/form/industry" />
        <LoanSection loanData={ this.props.loanData } editPath="/linc/form/loan" />
        <AdditionalSection additionalInfoData={ this.props.additionalInfoData } editPath="/linc/form/additional" />
        { /*<ReviewSection label="Contact" sectionContent={ this.props.contactInfoData }  />*/ }
        { /*<ReviewSection label="Business" sectionContent={ this.props.businessInfoData } editPath="/linc/form/business" />*/ }
        { /*<ReviewSection label="Industry" sectionContent={ this.props.industryInfoData } editPath="/linc/form/industry" />*/ }
        { /*<ReviewSection label="Loan" sectionContent={ this.props.loanData } editPath="/linc/form/loan" />*/ }
        { /*<ReviewSection label="Additional" sectionContent={ this.props.additionalInfoData } editPath="/linc/form/additional" />*/ }
        <form ref={ (input) => this.reviewSubmitInfoForm = input } onSubmit={ (e) => this.handleSubmit(e) }>
          <button className={ styles.submitBtn } type="submit"> SUBMIT </button>
        </form>
      </div>
      );
  }
  ;
}

// let contactInfoData = {
//   contactEmailAddress: "blahblah@gmail.com",
//   contactFullName: "Alexander Nelson",
//   contactPhoneNumber: "7037574642"
// };
//
// let industryInfoData = {
//   industryExperience: "",
//   industryType: "Automotive/Service Station,Energy"
// };
//
// let additionalInfoData = {
//   hasFinancialProjections: false,
//   hasWrittenPlan: false,
//   isGeneratingRevenue: false,
//   isVeteran: false
// };
//
// let businessInfoData = {
//   businessInfoDescription: "It is a business that does some interesting things yeah. It does a lot of interesting things and this paragraphs should be long enough to simulate stuff.",
//   businessInfoName: "Propers Pizza Palace",
//   businessInfoWebsite: "suhdude.com",
//   businessInfoZipcode: "22066"
// };
//
// let loanData = {
//   loanAmount: "$234,234,234",
//   loanDescription: "Developing a Product,Participating in Trade Show",
//   loanUsage: "This will be used to make some good business and make things very profitable for my stakeholders."
// };

const ContactSection = (props) => {
  let contact = props.contactInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Contact</h1>
      <p className={ styles.field }>
        { contact.contactFullName }
      </p>
      <p className={ styles.field }>
        { contact.contactPhoneNumber }
      </p>
      <p className={ styles.field }>
        { contact.contactEmailAddress }
      </p>
      <button className={ styles.editBtn } onClick={ () => browserHistory.push(props.editPath) }>Edit</button>
    </div>
  )
};

const BusinessSection = (props) => {
  let business = props.businessInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Business</h1>
      <p className={ styles.field }>
        { business.businessInfoName }
      </p>
      <p className={ styles.field }>
        { business.businessInfoWebsite || "-" }
      </p>
      <p className={ styles.field }>
        { business.businessInfoZipcode }
      </p>
      <p className={ styles.field }>
        { business.businessInfoDescription }
      </p>
      <button className={ styles.editBtn } onClick={ () => browserHistory.push(props.editPath) }>Edit</button>
    </div>
  )
};

const IndustrySection = (props) => {
  let industry = props.industryInfoData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Industry</h1>
      <p className={ styles.field }>
        { industry.industryType }
      </p>
      <p className={ styles.field }>
        { industry.industryExperience }
      </p>
      <button className={ styles.editBtn } onClick={ () => browserHistory.push(props.editPath) }>Edit</button>
    </div>
  )
};

const LoanSection = (props) => {
  let loan = props.loanData;
  return (
    <div className={ styles.sectionContainer }>
      <h1 className={ styles.title }>Loan</h1>
      <p className={ styles.field }>
        { loan.loanAmount }
      </p>
      <p className={ styles.field }>
        { loan.loanUsage }
      </p>
      <p className={ styles.field }>
        { loan.loanDescription }
      </p>
      <button className={ styles.editBtn } onClick={ () => browserHistory.push(props.editPath) }>Edit</button>
    </div>
  )
};

const AdditionalSection = (props) => {
  let additionalInfo = props.additionalInfoData;
  let displaySection = additionalInfo.isGeneratingRevenue || additionalInfo.hasWrittenPlan || additionalInfo.hasFinancialProjections || additionalInfo.isVeteran;
  return (
    <div>
      { displaySection ? (
        <div className={ styles.sectionContainer }>
          <h1 className={ styles.title }>Additional</h1>
          { additionalInfo.isGeneratingRevenue ? <p className={ styles.field }>I'm generating revenue</p> : null }
          { additionalInfo.hasWrittenPlan ? <p className={ styles.field }>I have a written business plan</p> : null }
          { additionalInfo.hasFinancialProjections ? <p className={ styles.field }>I have financial projections</p> : null }
          { additionalInfo.isVeteran ? <p className={ styles.field }>I'm a veteran</p> : null }
          <button className={ styles.editBtn } onClick={ () => browserHistory.push(props.editPath) }>Edit</button>
        </div>
        ) : null }
    </div>
  )
};



function mapStateToProps(state) {
  return {
    loanData: state.lenderMatch.loanData,
    additionalInfoData: state.lenderMatch.additionalInfoData,
    contactInfoData: state.lenderMatch.contactInfoData,
    businessInfoData: state.lenderMatch.businessInfoData,
    industryInfoData: state.lenderMatch.industryInfoData
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
)(ReviewSubmitInfoForm);
