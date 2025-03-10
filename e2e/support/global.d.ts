import { Browser } from "webdriverio";

declare module "@cucumber/cucumber" {
    interface IWorld {
        drivers: Browser;
    }
}
