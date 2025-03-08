Feature: Login com sucesso na amazom
    Como usuário do sistema XPTO
    Eu quero criar um novo treino
    Para que eu possa visualizar meus treinos

    @positive
    Scenario: Exibir página de login
        When Clicar na opcao settings
        And Clicar na opcao bateria
        Then Deve visualizar a opcao da bateria