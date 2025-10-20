/* eslint-disable @typescript-eslint/no-explicit-any */

import { hydrateRoot } from 'react-dom/client';
import { createElement } from 'react';

export function hydrate(
  component: React.ComponentType<any>,
  element: HTMLElement,
  props?: Record<string, any>
) {
  hydrateRoot(element, createElement(component, props));
}
