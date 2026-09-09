Feature: Ping Pong

  Scenario: Retorna pong con el mensaje recibido
    Given un mensaje de entrada "ping"
    When se ejecuta el use case
    Then la respuesta contiene message "pong"
    And la respuesta contiene echo "ping"
    And la respuesta contiene receivedAt con formato ISO

  Scenario: Falla con mensaje vacío
    Given un mensaje de entrada ""
    When se ejecuta el use case
    Then se lanza una ValidationException

  Scenario: Expone el endpoint HTTP de ping
    Given la aplicacion levantada
    When se envia un POST a "/ping" con el mensaje "hola"
    Then el status code es 200
    And el cuerpo contiene echo "hola"

  Scenario: Rechaza un mensaje vacio por HTTP
    Given la aplicacion levantada
    When se envia un POST a "/ping" con el mensaje ""
    Then el status code es 400
    And el cuerpo contiene el code "CORE-001"
