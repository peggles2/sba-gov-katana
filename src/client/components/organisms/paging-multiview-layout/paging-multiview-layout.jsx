import React from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'lodash'

import styles from './paging-multiview-layout.scss'
import { Paginator } from 'molecules'
import { logPageEvent } from '../../../services/analytics.js'

class PagingMultiviewLayout extends React.PureComponent {
  constructor(ownProps) {
    super()
    this.state = {
      currentRenderer: ownProps.rendererOne,
      currentRendererName: ownProps.rendererOneName
    }
  }

  renderItems() {
    let result = 'Loading...'
    const { items, pageNumber, onReset, type } = this.props
    if (!isEmpty(items)) {
      result = this.state.currentRenderer(items)
    } else {
      result = (
        <div className={`no-results-message-container ${styles.noResults}`}>
          <p className={styles.noResultsMessage}>Sorry, we couldn't find any {type} matching that query.</p>
          <p>
            <a onClick={onReset}>Clear all search filters</a>
          </p>
        </div>
      )
    }

    return <div className={`${styles.itemContainer}`}>{result}</div>
  }

  renderPaginator() {
    const { items, itemCount, pageNumber, pageSize } = this.props
    let result = <div />
    if (!isEmpty(items)) {
      result = (
        <div className={styles.paginator}>
          <Paginator
            pageNumber={pageNumber}
            pageSize={pageSize}
            total={itemCount}
            onBack={this.handleBack.bind(this)}
            onForward={this.handleForward.bind(this)}
          />
        </div>
      )
    }
    return result
  }

  handleBack() {
    const { pageNumber, onPageChange, googleAnalyticsCategory } = this.props
    const newPageNumber = Math.max(1, pageNumber - 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: googleAnalyticsCategory, action: 'Previous' })
  }

  handleForward() {
    const { itemCount, pageNumber, onPageChange, googleAnalyticsCategory } = this.props
    const newPageNumber = Math.min(Math.max(1, Math.ceil(itemCount / this.props.pageSize)), pageNumber + 1)
    onPageChange(newPageNumber)
    logPageEvent({ category: googleAnalyticsCategory, action: 'Next' })
  }

  renderViewTypeSelector() {
    const { rendererOneName, rendererTwoName } = this.props
    if (rendererOneName && rendererTwoName) {
      return (
        <div className={`view-type-selector ${styles.viewTypeSelector}`}>
          {rendererOneName} | {rendererTwoName}
        </div>
      )
    } else {
      return <div />
    }
  }

  render() {
    return (
      <div>
        {this.renderViewTypeSelector()}
        {this.renderPaginator()}
        {this.renderItems()}
        {this.renderPaginator()}
      </div>
    )
  }
}

PagingMultiviewLayout.defaultProps = {
  onPageChange: () => {},
  onReset: () => {},
  itemCount: 0,
  items: [],
  pageNumber: 0,
  pageSize: 0,
  rendererOne: item => {
    return <div>item</div>
  },
  rendererTwo: item => {
    return <div>item</div>
  },
  rendererOneName: null,
  rendererTwoName: null,
  googleAnalyticsCategory: 'Show-More-Results',
  type: 'items'
}

PagingMultiviewLayout.propTypes = {
  onPageChange: PropTypes.func,
  onReset: PropTypes.func,
  itemCount: PropTypes.number,
  items: PropTypes.array,
  pageNumber: PropTypes.number,
  pageSize: PropTypes.number,
  rendererOne: PropTypes.func,
  rendererTwo: PropTypes.func,
  rendererOneName: PropTypes.string,
  rendererTwoName: PropTypes.string,
  googleAnalyticsCategory: PropTypes.string,
  type: PropTypes.string
}

export default PagingMultiviewLayout
