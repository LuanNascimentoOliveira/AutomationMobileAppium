const { When, Then } = require('@cucumber/cucumber');

When('Clicar na opção settings', async function () {
    const settings = await this.driver.$('~Configurações');
    await settings.click();
});

When('Clicar na opção bateria', async function () {
    const batteryItem = await this.driver.$('~Bateria e desempenho');
    await batteryItem.click();
});

Then('Deve visualizar a opção da bateria', async function () {
    const title = await this.driver.getElementText("Battery");
    console.log(title);
});
