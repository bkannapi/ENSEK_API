Feature: Orders lists feature

Scenario: User verifies orders list details
  Given I am logged in ensek
  When I view order lists
  Then I can confirm the number of orders created today