import React from 'react'
import PropTypes from 'prop-types'
import { mount } from 'enzyme'
import renderer from 'react-test-renderer'
import { TitleSection } from 'molecules/title-section/title-section'

const options = {
  context: {
    router: {
      createHref: () => {},
      getCurrentLocation: () => ({ pathname: '' }),
      go: () => {},
      goBack: () => {},
      goForward: () => {},
      isActive: () => {},
      push: () => {},
      replace: () => {},
      setRouteLeaveHook: () => {}
    }
  },
  childContextTypes: { router: PropTypes.object }
}

describe('Content section', () => {
  test("should render 'Content' word and subject header link texts", () => {
    const component = mount(
      <TitleSection
        location={{ pathname: '/' }}
        title={'List of for partners'}
        summary={'This is a test to check and maintain.'}
        sectionHeaders={[
          { id: 'section-header-0', text: 'Find interlink' },
          { id: 'section-header-2', text: 'Found two' },
          { id: 'section-header-4', text: 'Since 10' }
        ]}
      />,
      options
    )
    const para = component.find('#titleSectionContentId').first()
    const li1 = component.find('#titleSectionLinkId0')
    const li2 = component.find('#titleSectionLinkId1')
    const li3 = component.find('#titleSectionLinkId2')

    expect(para.text()).toBe('Content')
    expect(li1.text()).toBe('Find interlink')
    expect(li2.text()).toBe('Found two')
    expect(li3.text()).toBe('Since 10')
  })
})

describe('Content section', () => {
  test("should not render 'Content' word and any subject header links", () => {
    const component = mount(
      <TitleSection
        location={{ pathname: '/' }}
        title={'List of for partners'}
        summary={'This is a test to check and maintain.'}
        sectionHeaders={[]}
      />
    )

    expect(component.find('#titleSectionContentId').exists()).toEqual(false)
    expect(component.find('#titleSectionLinkId0')).toHaveLength(0)
  })
})
