Feature: Visualizar bateria
    Como usuário do sistema Android
    Eu quero acessar a opção da bateria
    Para que eu possa visualizar o desempenho da bateria

    Background: O Android está ligado

    @positive
    Scenario Outline: Exibir bateria do Android
        When Clicar na opção settings do android "<Devices>"
        And Clicar na opção bateria
        Then Deve visualizar a opção da bateria

    Examples:
        | Devices       |
        | emulator-5554 |
        | 1aeb9a65      |
