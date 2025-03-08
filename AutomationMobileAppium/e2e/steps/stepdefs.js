const { When, Then } = require('@cucumber/cucumber');

When('Clicar na opcao settings', async function () {
    const settings = await this.driver.$('//*[@text="Settings"]');
    await settings.click();
});

When('Clicar na opcao bateria', async function () {
    const batteryItem = await this.driver.$('//*[@text="Battery"]');
    await batteryItem.click();
    await batteryItem.takeScreenshot();
});

Then('Deve visualizar a opcao da bateria', async function () {
    const title = await this.driver.getElementText("Battery");
    console.log(title);
});
