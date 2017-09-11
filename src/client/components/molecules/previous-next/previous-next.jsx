import React from "react";
import styles from "./previous-next.scss";
import _ from "lodash";
import {SmallSecondaryButton} from "atoms";

const businessGuideUrl = "/business-guide";

class PreviousNextSection extends React.Component {
  getCurrentArticle(lineage) {
    return _.last(lineage);
  }

  getSections() {
    let thirdToLast = _.nth(this.props.lineage, -3);
    return thirdToLast? thirdToLast.children : null;
  }

  getArticlesFromSections(sections) {
    return _.compact(_.flatMap(sections, (section) => {
      return section.children;
    }));
  }

  getCurrentArticleIndex(articles, currentArticle) {
    return _.findIndex(articles, (article) => {
      return article && article.fullUrl && article.fullUrl === currentArticle.fullUrl;
    });
  }

  getAdjacentArticle(indexDifference) {
    if (!this.props.lineage) {
      return null;
    }
    const includeAdjacentSections = this.props.lineage[0].fullUrl === businessGuideUrl
    const currentArticle = this.getCurrentArticle(this.props.lineage);
    const sections = this.getSections();
    const articles = includeAdjacentSections ? this.getArticlesFromSections(sections) : _.nth(this.props.lineage, -2).children;
    const currentArticleIndex = this.getCurrentArticleIndex(articles, currentArticle);
    if (indexDifference > 0) {
      if (currentArticleIndex < 0 || currentArticleIndex >= articles.length - indexDifference) {
        return null;
      }
      return articles[currentArticleIndex + indexDifference];
    } else {
      // indexDifference negative
      if (currentArticleIndex < (indexDifference * -1) || currentArticleIndex >= articles.length) {
        return null;
      }
      return articles[currentArticleIndex + indexDifference];
    }
  }

  getNextArticle() {
    return this.getAdjacentArticle(1);
  }

  getPreviousArticle() {
    return this.getAdjacentArticle(-1);
  }

  render() {
    const previousArticle = this.getPreviousArticle();
    const nextArticle = this.getNextArticle();

    return (
      <div id="previousNextSectionId" className={styles.previousNextContainer}>
        <div id="desktopDivId" className={styles.desktop}>
          <div id="prevNextTitleContainerId" className={styles.prevNextTitleContainer}>
            {
              previousArticle !== null ?
                <div id="previousTitleId" className={styles.previousTitle}>
                  <h6 className={styles.previousTitle}>Previous</h6>
                </div>
                :
                <div className={styles.titleHide}>
                  <h6 className={styles.previousTitle}>No Previous Article</h6>
                </div>
            }
            {
              nextArticle !== null ?
                <div id="nextTitleDesktopId" className={styles.nextTitle}>
                  <h6 className={styles.nextTitle}>Next</h6>
                </div>
                :
                <div />
            }
          </div>
          <div id="prevNextButtonsContainerId" className={styles.prevNextButtonsContainer}>
            {
              previousArticle !== null ?
                <div id="previousContainerId" className={styles.previousContainer}>
                  <div className={"previousnext-previous-url"}><SmallSecondaryButton
                    text={previousArticle.title} url={previousArticle.fullUrl}/></div>
                  <i className={"fa fa-chevron-left " + styles.chevronPrevious} aria-hidden="true"></i>
                </div>
                :
                <div className={styles.previousContainerHide}>
                  <SmallSecondaryButton text="No previous article"/>
                </div>
            }
            {
              nextArticle !== null ?
                <div id="nextContainerDesktopId" className={styles.nextContainer}>
                  <div className={"previousnext-next-url"} ><SmallSecondaryButton
                    text={nextArticle.title} url={nextArticle.fullUrl}/></div>
                  <i className={"fa fa-chevron-right " + styles.chevronNext} aria-hidden="true"></i>
                </div>
                :
                <div/>
            }
          </div>
        </div>
        <div id="mobileDivId" className={styles.mobile}>
          {
            nextArticle !== null ?
              <div id="nextTitleMobileId" className={styles.nextTitle}>
                <h6 className={styles.nextTitle}>Next</h6>
              </div>
              :
              <div/>
          }
          {
            nextArticle !== null ?
              <div id="nextContainerMobileId" className={styles.nextContainer}>
                <a className={"previousnext-next-url"}>
                    <SmallSecondaryButton text={nextArticle.title} url={nextArticle.fullUrl} />
                </a>
                <i className={"fa fa-chevron-right " + styles.chevronNext} aria-hidden="true"></i>
              </div>
              :
              <div/>
          }
        </div>
      </div>
    );
  }
}

PreviousNextSection.propTypes = {
  lineage: React.PropTypes.array.isRequired
};

export default PreviousNextSection;
