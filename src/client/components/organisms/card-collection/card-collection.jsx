import React from 'react'
import PropTypes from 'prop-types'
import { chunk, size } from 'lodash'

import styles from './card-collection.scss'
import { Card } from 'molecules'

const cardsPerRowMap = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 3,
  '6': 6,
  '7': 4,
  '8': 4,
  '9': 3,
  '10': 4,
  '11': 4,
  '12': 6
}

class CardCollection extends React.Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    const { leftAligned, parentIndex, cards, numberOverride, cardAriaLabel } = this.props
    const numCards = numberOverride ? numberOverride : size(this.props.cards)
    const cardComponents = cards.map(function(item, index) {
      return (
        <Card
          parentIndex={parentIndex}
          key={index}
          item={item}
          index={index}
          numCards={numCards}
          leftAligned={leftAligned}
          cardAriaLabel={cardAriaLabel}
        />
      )
    })
    const cardsPerRow = cardsPerRowMap[cardComponents.length]
    const rows = chunk(cardComponents, cardsPerRow)
    return (
      <div className={styles.cardCollection}>
        {rows.map(function(item, index) {
          return (
            <div id={'card-row-' + parentIndex + '-' + index} key={index} className={styles.cardRow}>
              {item}
            </div>
          )
        })}
      </div>
    )
  }
}

CardCollection.propTypes = {
  cardAriaLabel: PropTypes.string,
  cards: PropTypes.array,
  numberOverride: PropTypes.number,
  parentIndex: PropTypes.number,
  leftAligned: PropTypes.bool
}

CardCollection.defaultProps = {
  cards: [],
  numberOverride: null,
  parentIndex: -1,
  leftAligned: false
}

export default CardCollection
