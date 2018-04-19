import { MDCFloatingLabelFoundation } from '@material/floating-label';

import adapterUtilities from './adapter-utilities';

export default ({ elementRoot, updateClassNames }) => {
  const {
    addClass,
    deregisterInteractionHandler,
    getWidth,
    registerInteractionHandler,
    removeClass,
  } = adapterUtilities();

  return new MDCFloatingLabelFoundation({
    addClass: addClass(updateClassNames),
    deregisterInteractionHandler: deregisterInteractionHandler(elementRoot),
    getWidth: getWidth(elementRoot),
    registerInteractionHandler: registerInteractionHandler(elementRoot),
    removeClass: removeClass(updateClassNames),
  });
};
