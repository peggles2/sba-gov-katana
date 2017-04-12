import React from 'react';
import { StartYourBusinessSection } from '../organisms/homepage/start-your-business.jsx';
import { FinanceYourBusinessSection } from '../organisms/homepage/finance-your-business.jsx';
import { SellToGovtSection } from '../organisms/homepage/sell-to-govt.jsx';
import HappeningNow from "../organisms/homepage/happening-now.jsx";

import DisasterAlerts from '../organisms/header-footer/disaster-alerts.jsx'
import Header from '../organisms/header-footer/header.jsx';
import Footer from '../organisms/header-footer/footer.jsx';
import PrimaryLanding from '../organisms/homepage/primary-landing.jsx';

import Blog from '../organisms/homepage/blog.jsx';
import ModalController from '../modal-controller.jsx';
import cookie from 'react-cookie';
import Waypoint from 'react-waypoint';

class Homepage extends React.Component {
  constructor(props) {
    super();
    this.state = {
      disasterAlertIsVisible: false,
      userHasScrolledPastAlert: true
    };
  }

  componentWillMount() {
    let visible = cookie.load('close_disaster_loan_parature')
      ? false
      : true;
    this.setState({
      disasterAlertIsVisible: visible
    });
  }

  handleClose() {
    this.setState({
      disasterAlertIsVisible: false
    });
    cookie.save('close_disaster_loan_parature', '1', {
      path: '/',
      secure: true
    });
  }

  handleWaypointLeave() {
    this.setState({
      userHasScrolledPastAlert: true
    });
  }

  handleWaypointEnter() {
    this.setState({
      userHasScrolledPastAlert: false
    });
  }

  render() {
    return (
      <div>
        <DisasterAlerts disasterAlertIsVisible={ this.state.disasterAlertIsVisible } onClose={ this.handleClose.bind(this) } />
        <Waypoint onEnter={ this.handleWaypointEnter.bind(this) } onLeave={ this.handleWaypointLeave.bind(this) } />
        <Header theme="sba-blue" disasterAlertIsVisible={ this.state.disasterAlertIsVisible } userHasScrolledPastAlert={ this.state.userHasScrolledPastAlert } />
        <PrimaryLanding/>
        <HappeningNow/>
        <StartYourBusinessSection/>
        <FinanceYourBusinessSection/>
        <SellToGovtSection/>
        <Blog/>
        <Footer/>
        <ModalController/>
      </div>
    )
  }
}

export default Homepage;