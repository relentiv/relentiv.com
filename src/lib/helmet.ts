import * as ReactHelmetAsyncModule from 'react-helmet-async';

const reactHelmetAsync = (
  Reflect.get(ReactHelmetAsyncModule, 'module.exports') ??
  Reflect.get(ReactHelmetAsyncModule, 'default') ??
  ReactHelmetAsyncModule
) as typeof import('react-helmet-async');

export const Helmet = reactHelmetAsync.Helmet;
export const HelmetData = reactHelmetAsync.HelmetData;
export const HelmetProvider = reactHelmetAsync.HelmetProvider;
