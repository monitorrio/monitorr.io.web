import './reset-password.styl';

import angular from 'angular';
import uirouter from 'angular-ui-router';

import routing from './reset-password.routes';
import resetPassword from './reset-password';
import resetPasswordController from './reset-password.controller';

export default angular.module('ResetPassword', [uirouter])
	.config(routing)
	.controller('resetPasswordController', resetPasswordController)
	.directive('resetPassword', resetPassword)
	.name;
