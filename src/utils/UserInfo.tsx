export type UserInfo = {
	firstName: string,
	lastName: string,
	dateOfBirth: string,
	balance: number,
	purchases: string[],
	proVersion: boolean,
	stat: {
		focus: number,
		meditation: number,
		nap: number,
	}
}