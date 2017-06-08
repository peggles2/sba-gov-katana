import React from 'react'
import BusinessGuideArticle from "../templates/business-guide-article/business-guide-article.jsx";
import FundingProgramsPage from "../templates/funding-programs-page/funding-programs-page.jsx";
import * as RestContentActions from "../../actions/rest-content.js"
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import _ from 'lodash';

class Page extends React.Component {

  componentWillMount() {
    let id = this.props.nodeId;
    if (id > 0) {
      this.props.actions.fetchContentIfNeeded("node", id);
    }
  }

  render() {
    if (this.props.data && this.props.lineage) {
      if (this.props.lineage[0].url === "guide" || this.props.lineage[0].url === "business-guide") {
        return (<BusinessGuideArticle title={this.props.data.title} paragraphs={this.props.data.paragraphs} summary={this.props.data.summary} lineage={this.props.lineage}/>);
      }
    }else if (this.props.data && this.props.section === "funding-programs") {
          return (<FundingProgramsPage paragraphs={this.props.data.paragraphs} />);
    }

    return (
      <div>Loading....</div>
    );
  }
}

Page.defaultProps = {
  section: "guide",
  nodeId: 26
}

function mapReduxStateToProps(reduxState, ownProps) {
  return {
    data: _.get(reduxState, "restContent.node[" + ownProps.nodeId + "]")
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(RestContentActions, dispatch)
  }
}

export default connect(mapReduxStateToProps, mapDispatchToProps)(Page);
