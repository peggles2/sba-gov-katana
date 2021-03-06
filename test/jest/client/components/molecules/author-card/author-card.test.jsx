/*eslint-disable no-undefined*/

import React from 'react'
import { render, cleanup, waitForElement, within } from 'react-testing-library'
import 'jest-dom/extend-expect'
import { AuthorCard } from 'molecules'

const mockPersonData = {
  bio:
    '<p>James Rivera was named Associate Administrator for SBA’s Office of Disaster Assistance in November 2009 after serving for several months as Acting Associate Administrator. In a typical year, his office approves about 20,000 loans totaling about $1 billion. This is the SBA’s sole direct lending program.</p>\r\n\r\n<p>Prior to this, Rivera served as deputy associate administrator of the office. In that role, he led several efforts to improve the agency’s disaster operations after hurricanes Katrina, Rita, and Wilma, including the launch of an online disaster loan application, the development of more efficient loan and underwriting processes, and computer upgrades which have resulted in quicker loan disbursements to businesses of all sizes, private non-profit organizations, homeowners, and renters affected by disasters.</p>\r\n\r\n<p>Rivera started his SBA career in 1989 as a disaster loan specialist in Ft. Worth, Texas. He joined the Office of Disaster Assistance team in Washington, D.C., in 1994. Rivera has provided leadership in a number of capacities at SBA since that time. For example, from 2002 to 2006, he served as associate administrator in the SBA’s Office of Financial Assistance. Also, he served for a year as assistant administrator for Equal Employment Opportunity and Civil Rights Compliance.</p>\r\n\r\n<p>Rivera also has private sector experience as a commercial loan officer specializing in marketing, underwriting and closing transactions in commercial real estate, wholesale and retail markets. He received a bachelor of Business Administration degree in Finance and Economics from Texas Tech University. He and his wife live in Maryland and they have two children.</p>\r\n\r\n<p><a href="https://content.sba.gov/sites/default/files/2019-02/james_rivera.jpg">Download a high resolution headshot</a></p>\r\n',
  emailAddress: {},
  fax: {},
  firstName: 'James',
  highResolutionPhoto: '/sites/default/files/2019-02/james_rivera.jpg',
  lastName: 'Rivera',
  office: 7322,
  phone: {},
  picture: '/sites/default/files/2019-02/bio-james-rivera.jpg',
  shortBio: 'this is a short bio',
  title: 'Associate Administrator',
  type: 'person',
  name: 'James Rivera',
  id: 7323,
  updated: 1551447722,
  created: 1528997067,
  langCode: 'en'
}

afterEach(cleanup)

describe('AuthorCard', () => {
  it('should have a name, title and bio', () => {
    const props = Object.assign({}, mockPersonData)

    const { getByTestId } = render(<AuthorCard {...props} />)

    let content = getByTestId('name')
    expect(content).toBeInTheDocument()

    content = getByTestId('title')
    expect(content).toBeInTheDocument()

    content = getByTestId('bio')
    expect(content).toBeInTheDocument()
  })

  it('should display an image', () => {
    const props = Object.assign({}, mockPersonData)

    const { getByTestId } = render(<AuthorCard {...props} />)

    const content = getByTestId('picture')
    expect(content).toBeInTheDocument()
  })

  it('should not display an image', () => {
    const props = Object.assign({}, mockPersonData)
    props.picture = {}

    const { queryByTestId } = render(<AuthorCard {...props} />)

    const content = queryByTestId('picture')
    expect(content).not.toBeInTheDocument()
  })

  it('should NOT display a read more section when there is NO url in the person data', () => {
    const props = Object.assign({}, mockPersonData)
    props.url = ''

    const { queryByTestId } = render(<AuthorCard {...props} />)

    const readMoreSection = queryByTestId('read-more')
    expect(readMoreSection).not.toBeInTheDocument()
  })

  it('should display a read more section with link when there is a url in the person data', () => {
    const url = '/someurl'
    const props = Object.assign({}, mockPersonData)
    props.url = url

    const { getByTestId } = render(<AuthorCard {...props} />)

    const readMoreSection = getByTestId('read-more')
    const readMoreLink = within(readMoreSection).getByText('Read More')
    expect(readMoreLink).toHaveAttribute('href', url)
  })

  it('should NOT contain a link in the name when there is NO url in the person data', () => {
    const props = Object.assign({}, mockPersonData)
    props.url = ''

    const { getByTestId } = render(<AuthorCard {...props} />)

    const nameSection = getByTestId('name')
    const name = within(nameSection).getByText(props.name)
    expect(name).not.toHaveAttribute('href')
  })

  it('should contain a link in the name when there is a url in the person data', () => {
    const url = '/someurl'
    const props = Object.assign({}, mockPersonData)
    props.url = url

    const { getByTestId } = render(<AuthorCard {...props} />)

    const nameSection = getByTestId('name')
    const name = within(nameSection).getByText(props.name)
    expect(name).toHaveAttribute('href', url)
  })
})
