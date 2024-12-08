Feature: Authentication feature

Scenario: User verifies test data reset
  Given I am logged in ensek
  And the response should include a success message
  When I reset the data
  And the reset response should include a success message