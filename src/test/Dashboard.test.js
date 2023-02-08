import renderer from 'react-test-renderer';
import Dashboard from '../component/Dashboard'

it('changes the class when hovered', () => {
  const component = renderer.create(
    <Dashboard></Dashboard>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseEnter();
  // });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();

  // manually trigger the callback
  // renderer.act(() => {
  //   tree.props.onMouseLeave();
  // });
  // re-rendering
  tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});