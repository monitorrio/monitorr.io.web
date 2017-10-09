import './signup.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './signup.routes';
import signup from './signup';
import signupController from './signup.controller';

export default angular.module('Signup', [uirouter])
	.config(routing)
	.controller('signController', signupController)
	.directive('signup', signup)
	.name;
