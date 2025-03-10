const { When, Then, Given } = require('@cucumber/cucumber');

When('Clicar na opção settings do android {string}', async function (string) {
    await Promise.all(this.drivers.map(async (driver) => {
        if (string === driver.capabilities.udid) {
            let element;
            element = await driver.$('//*[@text="Settings"]');
            await element.click();
        }
    }));
});

When('Clicar na opção settings do android {string}', async function (string) {
    await Promise.all(this.drivers.map(async (driver) => {
        if (string === driver.capabilities.udid) {
            let element;
            element = await driver.$('//*[@text="Settings"]');
            await element.click();
        }
    }));
});

When('Clicar na opção bateria', async function () {
    // const batteryItem = await this.driver.$('~Bateria e desempenho');
    // await batteryItem.click();
});

Then('Deve visualizar a opção da bateria', async function () {
    // const title = await this.driver.getElementText("Battery");
    // console.log(title);
});
