Feature: Health

  Scenario: Reporta el estado del servicio
    Given la aplicacion levantada
    When se consulta GET "/health"
    Then el status code es 200
    And el estado reportado es "ok"
    And el uptime reportado no es negativo
