export default['$httpProvider',
	$httpProvider => {
		$httpProvider.useApplyAsync(true);
		$httpProvider.useLegacyPromiseExtensions(false);
	}
];
