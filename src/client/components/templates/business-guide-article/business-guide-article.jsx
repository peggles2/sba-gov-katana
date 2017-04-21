import React from 'react'
import styles from './business-guide-article.scss';
import TextSection from "../../molecules/text-section/text-section.jsx";
import SectionHeader from "../../molecules/section-header/section-header.jsx"

const ParagraphTypeToBeImplemented = ({ data}) => {
  return (
    <p>{JSON.stringify(data)}</p>
  );
}

class BusinessGuideArticle extends React.Component {

  componentWillMount() {}

  makeParagraphs(paragraphData) {
    let paragraphs = [];
    paragraphs = paragraphData.map(function(item, i) {
      if (item && item.type) {
        if (item.type === "textSection") {
            return (<TextSection key={i} text={item.text}/>);
        } else if (item.type === "sectionHeader") {
            return (<SectionHeader key={i} text={item.text}/>);
        }
      } else {
        return (<ParagraphTypeToBeImplemented key={i} data={item}/>);
      }
    });
    return paragraphs;
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs);
    return (
      <div className={styles.container}>{paragraphs}</div>
    );
  }
}

export default BusinessGuideArticle;