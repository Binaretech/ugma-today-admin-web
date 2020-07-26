import React from 'react';
import Loader from './Loader';

export default { title: 'Loader' };

export const fullscreen = () => <Loader fullscreen />;

export const normal = () => (<Loader />);