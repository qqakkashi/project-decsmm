export const Routes = {
	Tabs: {
		Explore: '(tabs)/explore',
		Campaigns: '(tabs)/campaigns',
		Analytics: '(tabs)/analytics',
		Profile: '(tabs)/profile',
	},
	Auth: {
		Login: 'auth/login',
		Register: 'auth/register',
		PhoneVerify: 'auth/phone-verify',
	},
	Campaigns: {
		Create: 'campaigns/create',
	},
	makeRouteName: (string: string, index: number) => {
		return string.split('/')[index];
	},
};
