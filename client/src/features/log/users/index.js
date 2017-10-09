import './users.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import users from './users';

export default angular.module('Users', [uirouter])
	.directive('users', users)
	.name;
