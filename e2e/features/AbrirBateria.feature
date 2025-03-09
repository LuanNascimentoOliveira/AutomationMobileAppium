Feature: Visualizar bateria
    Como usuário do sistema android
    Eu quero acessar a opção da bateria
    Para que eu possa visualizar o desempenho da bateria

    @positive
    Scenario: Exibir bateria do android
        When Clicar na opção settings
        And Clicar na opção bateria
        Then Deve visualizar a opção da bateria