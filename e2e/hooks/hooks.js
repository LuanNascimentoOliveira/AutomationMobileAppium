const { Before, After, setDefaultTimeout} = require("@cucumber/cucumber");
const { remote} = require("webdriverio");

setDefaultTimeout(60000);

Before(async function () {
    const options = {
        protocol: "http",
        hostname: process.env.APPIUM_HOST || "localhost",
        port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
        path: "/",
        logLevel: 'info',
        capabilities: {
            platformName: 'Android',
            "appium:automationName": "UiAutomator2",
            "appium:deviceName": "Android",
            "appium:udid": "1aeb9a65",
            "appium:newCommandTimeout": 90,
            "appium:connectHardwareKeyboard": true,
            "appium:enablePerformanceLogging": true,
            "appium:ensureWebviewsHavePages": true,
            "appium:nativeWebScreenshot": true
        }
    };

    this.driver = await remote(options);    
});

After(async function () {
    if (this.elements) {
        await this.driver.deleteSession();
    }
});