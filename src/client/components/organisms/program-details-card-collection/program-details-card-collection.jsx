import React, {Component} from "react";
import _ from "lodash";
import {CardCollection} from "organisms";
import styles from "./program-details-card-collection.scss";

class ProgramDetailsCardCollection extends Component {

  render() {

    const {cards} = this.props;
    const remapData = () => {
      
      return (

        cards.map((item) => {

          return {
            titleText: item.title,
            subtitleText: item.description,
            link: item.fullUrl
          };

        })

      );
      
    };

    return (
      <div>
        {cards !== null &&
          <CardCollection cards={remapData()} leftAligned/>}
      </div>
    );

  }
  
}

const defaultCardsData = [
  {
    "title": "Title A",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title B",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title C",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title D",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title E",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }, {
    "title": "Title F",
    "fullUrl": "/my-path/my-page",
    "description": "Lorem ipsum dolor sit amet."
  }
];

ProgramDetailsCardCollection.defaultProps = {
  "cards": defaultCardsData,
  "leftAligned": true
};

export default ProgramDetailsCardCollection;