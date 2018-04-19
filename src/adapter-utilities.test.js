import adapterUtilities from './adapter-utilities';

const adapterUtilitiesInstance = adapterUtilities();

const CLASS_NAME_1 = 'CLASS_NAME_1';
const CLASS_NAME_2 = 'CLASS_NAME_2';

test('Adapter utilities > \'addClass()\' adds a className and sends the list to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [CLASS_NAME_1, CLASS_NAME_2];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_1);
  adapterUtilitiesInstance.addClass(updateClassNames)(CLASS_NAME_2);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});

test('\'deregisterInteractionHandler()\' removes an event listener from the element', () => {
  const HANDLER = 'HANDLER';
  const REMOVE_EVENT_LISTENER = jest.fn();
  const TYPE = 'TYPE';
  const element = { removeEventListener: REMOVE_EVENT_LISTENER };

  adapterUtilitiesInstance.deregisterInteractionHandler(element)(TYPE, HANDLER);

  expect(REMOVE_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER);
});

test('\'getWidth()\' returns the width of the given element', () => {
  const OFFSET_WIDTH = 'OFFSET_WIDTH';
  const element = { offsetWidth: OFFSET_WIDTH };
  const expected = OFFSET_WIDTH;

  const actual = adapterUtilitiesInstance.getWidth(element)();

  expect(actual).toBe(expected);
});

test('\'registerInteractionHandler()\' adds a non-passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'TYPE';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, null);
});

test('\'registerInteractionHandler()\' adds a passive interaction handler', () => {
  const ADD_EVENT_LISTENER = jest.fn();
  const HANDLER = 'HANDLER';
  const TYPE = 'touchstart';
  const element = { addEventListener: ADD_EVENT_LISTENER };

  adapterUtilitiesInstance.registerInteractionHandler(element)(TYPE, HANDLER);

  expect(ADD_EVENT_LISTENER).toBeCalledWith(TYPE, HANDLER, { passive: true });
});

test('\'removeClass()\' removes a classNames and sends the list of classNames to \'updateClassNames()\'', () => {
  const expectedFirst = [CLASS_NAME_1];
  const expectedSecond = [];
  const updateClassNames = jest.fn();

  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_2);
  adapterUtilitiesInstance.removeClass(updateClassNames)(CLASS_NAME_1);

  expect(updateClassNames.mock.calls[0][0]).toEqual(expectedFirst);
  expect(updateClassNames.mock.calls[1][0]).toEqual(expectedSecond);
});
