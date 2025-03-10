const { Before, After, setDefaultTimeout } = require("@cucumber/cucumber");
const { remote } = require("webdriverio");
const dotenv = require("dotenv").config();

setDefaultTimeout(60000);

Before(async function () {

    const deviceId = process.env.ANDROID_DEVICE_ID.split(",");
    this.drivers = [];

    const driverPromises = deviceId.map(async (deviceId) => {

        const caps = getCaps(deviceId).caps;

        const driver = await remote({
            protocol: "http",
            hostname: process.env.APPIUM_HOST,
            port: parseInt(process.env.APPIUM_PORT),
            path: "/",
            logLevel: 'info',
            capabilities: caps
        });

        return driver;
    });

    this.drivers = await Promise.all(driverPromises);
});

After(async function () {
    if (this.drivers) {
        await Promise.all(this.drivers.map(driver => driver.deleteSession()));
    }
});

function getCaps(deviceUdid) {
    return {
        name: deviceUdid,
        caps:
        {
            "appium:platformName": "Android",
            "appium:automationName": "UiAutomator2",
            "appium:deviceName": "Android",
            "appium:udid": deviceUdid,
            "appium:newCommandTimeout": 90,
            "appium:connectHardwareKeyboard": true,
            "appium:enablePerformanceLogging": true,
            "appium:ensureWebviewsHavePages": true,
            "appium:nativeWebScreenshot": true
        }
    }
}