import './login.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './login.routes';
import login from './login';
import loginController from './login.controller';

export default angular.module('Login', [uirouter])
	.config(routing)
	.controller('loginController', loginController)
	.directive('login', login)
	.name;
