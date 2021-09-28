/* eslint-disable @typescript-eslint/no-unused-vars */
import { AppStateStatus } from "react-native";

export class AppStateService {
static instance: AppStateService;

static STATE_ACTIVE: AppStateStatus = "active";
static STATE_BACKGROUND: AppStateStatus = "background";

previousState = AppStateService.STATE_BACKGROUND;
currentState = AppStateService.STATE_ACTIVE;

handlers: { [x: string]: (nextState: AppStateStatus) => void } = {};

appLaunchId = 0;

static getInstance = (): AppStateService => {
	if(!this.instance){
		this.instance = new AppStateService();
	}

	return this.instance;
}

static init = (): void => {
	const instance = AppStateService.getInstance();

	instance.appLaunchId = new Date().getTime() / 1000;
}

handleAppStateChange = (nextState: AppStateStatus): void => {
	if (nextState !== this.currentState) {
		this.previousState = this.currentState;
		this.currentState = nextState;

		for (const [key, handler] of Object.entries(this.handlers)) {
			handler(nextState);
		}
	}
}

getCurrentState = (): AppStateStatus => {
	return this.currentState;
}

getPreviousState = (): AppStateStatus => {
	return this.previousState;
}

addStateHandler = (key: string, handler: (nextState: AppStateStatus) => void): void => {
	this.handlers[key] = handler;
}

hasStateHandler = (key: string): boolean => {
	if (this.handlers[key]) {
		return true;
	}

	return false;
}

removeStateHandler = (key: string): void => {
	delete this.handlers[key];
}
}
