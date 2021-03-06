import React from 'react'
import ReactModal from 'react-modal'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { includes } from 'lodash'
import { runMiscAction } from '../../../fetch-content-helper.js'
import constants from '../../../services/constants.js'
import config from '../../../services/client-config.js'
import envelopeIcon from 'assets/svg/envelope.svg'
import exitIcon from 'assets/svg/close_button.svg'
import styles from './news-modal.scss'
import * as ModalActions from '../../../actions/show-modal.js'
import { Button, TextInput } from 'atoms'
import { logEvent } from '../../../services/analytics.js'
import {
  containsErrorOrNull,
  getEmailValidationState,
  getZipcodeValidationState
} from '../../../services/form-validation-helpers.js'

/* 6/29/18: This class is deprecated and may not have full functionality due to the removal of redux for http requests */
class SbaNewsModal extends React.Component {
  timerId = null

  constructor(props) {
    super()
    this.state = {
      userEmailAddress: '',
      userZipCode: '',
      modalIsOpen: config.govdelivery,
      displayForm: true,
      validStates: {
        userEmailAddress: null,
        userZipCode: null
      }
    }
  }

  componentDidMount() {
    this.validateFields(['userEmailAddress', 'userZipCode'])
    window.scrollTo(0, 0)
  }

  validateSingleField(validationFunction, name, defaultWhenNotSuccessful) {
    const validationState = validationFunction(name, this.state[name], defaultWhenNotSuccessful || null)
    if (validationState[name] === 'error') {
      logEvent({
        category: 'Newsletter Modal',
        action: 'Error Event',
        label: name
      })
    }
    return validationState
  }

  validateFields(fields, defaultWhenNotSuccessful) {
    let validStates = this.state.validStates

    if (includes(fields, 'userEmailAddress')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getEmailValidationState, 'userEmailAddress', defaultWhenNotSuccessful)
      )
    }
    if (includes(fields, 'userZipCode')) {
      validStates = Object.assign(
        validStates,
        this.validateSingleField(getZipcodeValidationState, 'userZipCode', defaultWhenNotSuccessful)
      )
    }
    this.setState({ validStates: validStates })
  }

  isValidForm() {
    return !containsErrorOrNull(this.state.validStates)
  }

  handleSubmit(e) {
    e.preventDefault()
    //we do not care about the response
    runMiscAction('newsletter-registration', {
      userEmailAddress: this.state.userEmailAddress,
      userZipCode: this.state.userZipCode
    })

    this.setState({ displayForm: false })
    this.timerId = setTimeout(() => {
      this.setState({ modalIsOpen: false })
    }, 5000)
  }

  componentWillUnmount() {
    if (this.timerId !== null) {
      clearTimeout(this.timerId)
    }
  }

  handleChange(e) {
    const newState = {}
    const name = e.target.name
    newState[name] = e.target.value
    this.setState(newState, () => this.validateFields([name]))
  }

  handleKeyDown(event) {
    const code = event.keyCode ? event.keyCode : event.which
    if (code === 13) {
      this.setState({ modalIsOpen: false })
    }
    event.preventDefault()
  }

  handleBlur(e) {
    this.validateFields([e.target.name], 'error')
  }

  handleFocus(nameOrEvent) {
    const name =
      nameOrEvent && nameOrEvent.target && nameOrEvent.target.name ? nameOrEvent.target.name : nameOrEvent
    logEvent({
      category: 'Newsletter Modal',
      action: 'Focus Event',
      label: name
    })
  }

  handleClose(event) {
    this.setState({ modalIsOpen: false })
    event.preventDefault()
  }

  render() {
    return (
      <ReactModal
        isOpen={this.state.modalIsOpen}
        className={styles.content}
        overlayClassName={styles.overlay}
        role="dialog"
        aria-labelledby="dialogTitle"
        contentLabel="Modal"
      >
        <div className={this.state.displayForm ? styles.titleWrapper : styles.hideForm}>
          <h2 id="dialogTitle" className={styles.title}>
            Get business advice and invitations to local business events.
          </h2>
          <a className={styles.imgContainer} onClick={this.handleClose.bind(this)} href="">
            <img
              className={styles.exitIcon}
              src={exitIcon}
              onKeyDown={event => this.handleKeyDown(event)}
            />
          </a>
        </div>
        <div className={this.state.displayForm ? styles.showForm : styles.removeForm}>
          <form
            id="newsletter-modal-form"
            ref={input => (this.newsletterModalForm = input)}
            onSubmit={e => this.handleSubmit(e)}
          >
            <TextInput
              name="userEmailAddress"
              errorText={constants.messages.validation.invalidNewsLetterEmail}
              placeholder="Your email address"
              onChange={this.handleChange.bind(this)}
              value={this.state.userEmailAddress}
              validationState={this.state.validStates.userEmailAddress}
              style={{ height: '40px' }}
              onBlur={this.handleBlur.bind(this)}
              onFocus={this.handleFocus.bind(this)}
            />
            <div className={styles.zipButtonWrapper}>
              <div className={styles.zipTextBox}>
                <TextInput
                  name="userZipCode"
                  errorText={constants.messages.validation.invalidNewsLetterZipCode}
                  placeholder="Zip code"
                  onChange={this.handleChange.bind(this)}
                  value={this.state.userZipCode}
                  validationState={this.state.validStates.userZipCode}
                  maxLength="5"
                  style={{ height: '40px' }}
                  onBlur={this.handleBlur.bind(this)}
                  onFocus={this.handleFocus.bind(this)}
                />
              </div>
              <div className={styles.btnContainer}>
                <Button disabled={!this.isValidForm()} primary small type="submit">
                  Subscribe
                </Button>
              </div>
            </div>
            <p className={styles.privacyLinkContainer}>
              <a
                className={styles.privacyLink}
                href="about-sba/sba-performance/open-government/about-sbagov-website/privacy-policy"
              >
                Privacy policy
              </a>
            </p>
          </form>
        </div>
        <div className={this.state.displayForm ? styles.hideForm : styles.byeContainer}>
          <a onClick={this.handleClose.bind(this)}>
            <img className={styles.exitIconBye} src={exitIcon} />
          </a>
          <img className={styles.envelopeIcon} src={envelopeIcon} />
          <p className={styles.byeMsg}>Thanks for subscribing!</p>
        </div>
      </ReactModal>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    modalActions: bindActionCreators(ModalActions, dispatch)
  }
}
export default connect(mapDispatchToProps)(SbaNewsModal)

export { SbaNewsModal }
