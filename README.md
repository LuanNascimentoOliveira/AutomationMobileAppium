# Testes Automatizados Mobile com Cucumber, Appium e JavaScript

Este repositório contém um conjunto de testes automatizados para aplicações mobile utilizando Cucumber, Appium, JavaScript e um status report ao final.


## Sumário
[Requisitos](#requisitos)\
[Estrutura do Projeto](#estrutura-do-projeto)\
[Instalação](#instalação)\
[Cucumber-JS](#cucumber-js)\
[Conectar a um emulador](#conectar-a-um-emulador)\
[Status Reports](#status-reports)

## Requisitos

Antes de iniciar a configuração, certifique-se de ter os seguintes requisitos instalados:

- [Node.js](https://nodejs.org/en) (versão 14 ou superior)
- [Appium](https://appium.io/docs/en/latest/quickstart/) (servidor)
- [Appium](https://github.com/appium/appium-inspector/releases)(inspector)
- [Java JDK](https://openjdk.org/install/) (versão 8 ou superior)
- [Android](https://developer.android.com/studio) (para testes em dispositivos Android e adicionar sdk)
- [UiAutomator2 Driver](https://appium.io/docs/en/2.0/quickstart/uiauto2-driver/)
- Um dispositivo físico ou emulador configurado
- [Cucumber-Js](https://cucumber.io/docs/installation/javascript)
- [Status report](https://www.npmjs.com/package/cucumber-html-reporter)


## Estrutura do Projeto
```bash
.
├── apps/                      # Aplicativos para teste
│   ├── android-app.apk        # APK do aplicativo Android
│   ├── ios-app.app            # Aplicativo iOS
│
├── features/                  # Arquivos de features do Cucumber
│   ├── stepdefs.feature       # Exemplo de feature
│   ├── steps/                 # Definições de steps do Cucumber
│   │   ├── stepdefs.js        # Passos das features
│
├── hooks/                     # Hooks específicos do projeto
│   ├── hooks.js               # Hooks globais do Cucumber
│
├── reports/                   # Relatórios de execução dos testes
│
├── support/                   # Suporte e configurações adicionais
│   ├── register-report.js     # Configuração status report
│   ├── global.d.ts            # Configuração global
│
├── cucumber.json              # Configuração do Cucumber
├── package.json               # Dependências e scripts
├── README.md                  # Documentação
```

**Obs**:  Para executar projeto foi necessario adicionar os comandos principais no ``cucumber.json`` mas pode ser adicionado no ``package.json``.

## Instalação

### Clone o repositório:

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio
```
## NPM 
### inicie o npm:
```bash
npm init
```
### Instale as dependências do projeto:
```bash
npm install
```
## Appium
Obs: Execute todos os comandos no cmd, não precisa ser no projeto.
### Instale o Appium globalmente:
```bash
npm install -g appium
```
### Instale os drivers necessários para o Appium:
```bash
appium driver install uiautomator2
ou
appium setup
```
### Verique se os driver está tudo ok. :
```bash
appium driver doctor uiautomator2
```
### Executar o Appium Server :
```bash
appium
```

## Cucumber-JS

### Instale o cucumber no projeto

```bash
npm install --save-dev @cucumber/cucumber
```
O `package.json` tem que estar assim
```
{
    "name": "hellocucumber",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "cucumber-js"
    },
    "keywords": [],
    "author": "",
    "license": "ISC",
    "devDependencies": {
        "@cucumber/cucumber": "^11.1.1"
    }
}
```
### Crie uma infra para o projeto.
A pasta features ficara tanto os arquivos do cucumber.feature assim como os scripts em js em step_definitions.

```bash
mkdir features
mkdir features/step_definitions
```

Crie um arquivo `stepdefs.js`(ou qualquer nome que deseja, de preferencia com o mesmo nome do teste) dentro do step_definitions
```
const assert = require('assert');
const { Given, When, Then } = require('@cucumber/cucumber');
```
Crie um arquivo `stepdefs.feature`(ou qualquer nome que deseja, de preferência com o mesmo nome do teste) dentro do step_definitions e adicione o Gherkin abaixo.
```bash
Feature: Visualizar bateria
    Como usuário do sistema android
    Eu quero acessar a opção da bateria
    Para que eu possa visualizar o desempenho da bateria

    @positive
    Scenario: Exibir bateria do android
        When Clicar na opção settings
        And Clicar na opção bateria
        Then Deve visualizar a opção da bateria
```

Crie uma `cucumber.json` na raiz do projeto, na mesma hierarquia do `package.json`
```bash
{
  "default": {
    "formatOptions": {
      "snippetInterface": "synchronous"
    },
    "paths": [
      "e2e/features/"
    ],
    "require": [
      "e2e/hooks/*.js",
      "e2e/features/steps/*.js"
    ],
    "format": [
      "json:e2e/report/cucumber_report.json"
    ]
  }
}
```

Verifique o teste
```bash
npm test
```
No console deve apresentar algo como :
```
? When Clicar na opção settings
       Undefined. Implement with the following snippet:

         When('Clicar na opção settings', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? And Clicar na opção bateria
       Undefined. Implement with the following snippet:

         When('Clicar na opção bateria', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });

   ? Then Deve visualizar a opção da bateria
       Undefined. Implement with the following snippet:

         Then('Deve visualizar a opção da bateria', function () {
           // Write code here that turns the phrase above into concrete actions
           return 'pending';
         });
```
Isso significa que o arquivo `stepdefs.js` não possui as funções acima, portanto, copia as funções  e adicione ao aquivo, ficando algo como:
```
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
```


### Conectar a um emulador
**Obs 1**: Para esse projeto eu criei hooks e support para iniciar o emulador e carregar todos os drivers antes dos testes para conseguir capturar os elementos do xml da app.\
**Obs 2**: Se desejar saber quais aparelhos que estão conectados consulte [AQUI](https://developer.android.com/tools/adb), será necessário adicionar um aparelho as caps.\
**Obs 3**: Pode ser configurado para carregar vários aparelhos, no meu caso coloquei só Android no momento.

```bash
adb devices
```
na hook.js adicione as configurações para acessar o aparelho
```hook.js
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
            "appium:udid": "emulator-5554",
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
```

e para o this.driver conseguir carregar corretamente o webdriverIO de remote eu criei um arquivo global para o driver dentro de support, esse arquivo tem que ser em ts para poder carregar a interface de IWorld e adicionar o driver globalmente para poder ser carregado em qualquer arquivo do projeto
```global.d.ts
import { Browser } from "webdriverio";

declare module "@cucumber/cucumber" {
    interface IWorld {
        driver: Browser;
    }
}
```
## Status Reports
### cucumber-html-reporter

Instale o cucumber report com o comando:
```bash
npm install cucumber-html-reporter --save-dev
```

Crie o arquivo ``register-report.js``, esse arquivo irá converter os resultados do ``cucumber_report.json`` em html, gerando status report dos testes em formato de gráficos. 
**Obs**: Em ``jsonFile`` informe o path do arquivo json gerado pelo cucumber. e o output o mesmo path para gerar o html.

No cucumber.json adicione o seguinte path:

```cucumber.json
"format": [
  "json:e2e/report/cucumber_report.json"
]
```
```register-report.js
const { generate } = require("cucumber-html-reporter");

var options = {
    theme: 'bootstrap',
    jsonFile: 'e2e/report/cucumber_report.json',
    output: 'e2e/report/cucumber_report.html',
    reportSuiteAsScenarios: true,
    scenarioTimestamp: true,
    launchReport: true,
    metadata: {
        "App Version": "0.3.2",
        "Test Environment": "STAGING",
        "Browser": "Chrome  54.0.2840.98",
        "Platform": "Windows 10",
        "Parallel": "Scenarios",
        "Executed": "Remote"
    },
    failedSummaryReport: true,
};

generate(options);
```

Agora para gerar o report é necessário executar o seguinte comando com o endereço do register-report.js:

```
node e2e/support/register-report.js
```
ou adicione ao ``package.json`` aos demais comandos em scripts ficando algo como :

```package.json
"scripts": {
    "start": "cucumber-js",
    "report": "node e2e/support/register-report.js",
    "test": "npm run start && npm run report"
}
```





























