import { Browser } from "webdriverio";

declare module "@cucumber/cucumber" {
    interface IWorld {
        driver: Browser;
    }
}
