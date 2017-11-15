import React from 'react'
import TextSection from '../text-section/text-section.jsx'
import SectionHeader from '../section-header/section-header.jsx'
import * as paragraphMapper from '../../templates/paragraph-mapper.jsx'
import { CardCollection } from 'organisms'
import styles from './style-gray-background.scss'

class StyleGrayBackground extends React.Component {
  makeParagraphs(paragraphData) {
    let paragraphList = paragraphMapper.makeParagraphs(paragraphData, index => {
      return 'gray-section-header-' + index
    })
    let wrapperClassMapping = {
      other: styles.textSection,
      textSection: styles.textSection,
      sectionHeader: styles.sectionHeader,
      cardCollection: styles.cardCollection
    }
    let wrapped = paragraphMapper.wrapParagraphs(
      paragraphList,
      wrapperClassMapping
    )
    return wrapped
  }

  render() {
    let paragraphs = this.makeParagraphs(this.props.paragraphs)

    return <div className={styles.greyParagraph}>{paragraphs}</div>
  }
}

StyleGrayBackground.propTypes = {
  parentIndex: React.PropTypes.number
}

StyleGrayBackground.defaultProps = {
  parentIndex: -1
}

export default StyleGrayBackground
