import React from 'react';
import styles from '../../styles/buttons.scss';
import { Button, Row, Col, FormGroup, FormControl } from 'react-bootstrap'
import axios from 'axios';


export class CounselorBtn extends React.Component {
  constructor() {
    super();
    this.state = {
      displayZip: false,
      zip: ""
    }
  }

  displayZipBtn() {
    this.setState({
      displayZip: true
    });
  }

  postZipcode() {
    let newTab = window.open("", "_blank")
    axios.post('/matchLocalAssistants', {
      zipcode: this.state.zip
    })
      .then(function(res) {
        newTab.location = res.data.redirectTo;
      })
      .then(function(err) {
        console.error(err)
      })
  }

  handleChange(e) {
    let num = e.target.value;
    if (!/[^\d]/.test(num) && num.length <= 5) {
      this.setState({
        zip: e.target.value
      });
    }
  }


  render() {
    return (
      <div>
        { !this.state.displayZip ? (
          <Col xs={ 3 } xsOffset={ 2 } lg={ 2 } lgOffset={ 3 }>
          <Button block className={ styles.helpBtn + " pull-right" } onClick={ this.displayZipBtn.bind(this) }>
            TALK TO A COUNSELOR
          </Button>
          </Col>

          ) : (
          <div>
            <Col xs={ 4 } xsOffset={ 1 }>
            <Col xs={ 6 }>
            <FormGroup style={ { display: "inline" } }>
              <FormControl style={ { display: "inline" } } type="text" value={ this.state.zip } placeholder="Enter Zipcode" onChange={ (e) => this.handleChange(e) } />
            </FormGroup>
            </Col>
            <Col xs={ 6 }>
            <Button block className={ styles.findCounselorsBtn + " pull-right" } onClick={ this.postZipcode.bind(this) }>
              LETS DO THIS
            </Button>
            </Col>
            </Col>
          </div>
          ) }
      </div>
    )
  }
}

export default CounselorBtn;
