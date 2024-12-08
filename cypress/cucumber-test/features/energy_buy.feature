Feature: Fuel buy feature

Scenario: User buy a quantity each fuel
  Given I am logged in ensek
  Then I fetch energy details 
  When I place orders for each energy type with quantity 3
  Then all orders should be successful