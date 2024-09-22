export const Routes = {
	Tabs: {
		Explore: '(tabs)/index',
		Campaigns: '(tabs)/campaigns',
		Analytics: '(tabs)/analytics',
		Profile: '(tabs)/profile',
	},
	Auth: {
		Login: 'auth/login',
		Register: 'auth/register',
		PhoneVerify: 'auth/phone-verify',
	},
	makeRouteNameForStackFromEndRoute: (string: string) => {
		return string.split('/')[1];
	},
	makeRouteNameForStackFromStartRoute: (string: string) => {
		return string.split('/')[0];
	},
} as const;
