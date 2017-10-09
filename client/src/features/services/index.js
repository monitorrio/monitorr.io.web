import angular from 'angular';

import notifications from './notifications';
import lookups from './lookups';
import logs from './logs';
import errorService from './error-service';
import principal from './principal';
import httpService from './http-service';
import searchService from './search-service';
import helpersService from './helper-service';
import accountService from './account-service';
import enumService from './enum-service';
import ENV from './env';

export default angular.module('Services', [])
	.service('httpService', httpService)
	.factory('helpersService', helpersService)
	.service('searchService', searchService)
	.factory('notifications', notifications)
	.factory('lookups', lookups)
	.service('logs', logs)
	.service('errorService', errorService)
	.service('principal', principal)
	.service('accountService', accountService)
	.constant('ENV', ENV)
	.constant('enumService', enumService)
	.name;
