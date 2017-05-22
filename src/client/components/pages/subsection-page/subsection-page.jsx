import React from 'react'

class SubsectionPage extends React.Component {

  render() {
    if (this.props.subSectionData) {
      let subsectionData = this.props.subSectionData;
      return (
        <div>
          <p>{subsectionData.title}</p>
          <ol>
            {subsectionData.children
              ? subsectionData.children.map((inner, jndex) => {
                return (
                  <li key={jndex}>
                    <a href={ inner.url + "/"}>{inner.title}</a>
                  </li>
                );
              })
              : <div/>}

          </ol>
        </div>
      );
    }
    return (
      <div>Loading....</div>
    );
  }
}

SubsectionPage.defaultProps = {
  subSectionData: []
}

export default SubsectionPage;
