export type SendConfirmationPayload = {
	phone_number: string;
};

export type ConfirmCheckPayload = {
	code: string;
} & SendConfirmationPayload;
