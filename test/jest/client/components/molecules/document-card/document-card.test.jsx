/*global expect*/

import React from 'react';
import DocumentCard from 'client/components/molecules/document-card/document-card.jsx';
import {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

test('DocumentCard renders default data', () => {
  const component = renderer.create(<DocumentCard />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});



test('DocumentCard renders the title', () => {
  const component = renderer.create(<DocumentCard title={"This is a different title"} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DocumentCard renders the summary', () => {
  const component = renderer.create(<DocumentCard summary={"This is a different summary"} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DocumentCard renders no activitys when none are given', () => {
  const component = renderer.create(<DocumentCard activitys={[]} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DocumentCard renders a single activity', () => {
  const component = renderer.create(<DocumentCard activitys={["test1"]} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});

test('DocumentCard renders a single program', () => {
  const component = renderer.create(<DocumentCard programs={["test1"]} />);
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});