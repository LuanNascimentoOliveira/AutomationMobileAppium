const { When, Then } = require('@cucumber/cucumber');

When('Clicar na opção settings', async function () {
    const settings = await this.driver.$('//*[@text="Settings"]');
    await settings.click();
});

When('Clicar na opção bateria', async function () {
    const batteryItem = await this.driver.$('//*[@text="Battery"]');
    await batteryItem.click();
    await batteryItem.takeScreenshot();
});

Then('Deve visualizar a opção da bateria', async function () {
    const title = await this.driver.getElementText("Battery");
    console.log(title);
});
