import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
const baseEndpoint = 'https://qacandidatetest.ensek.io/ENSEK'; 

Given('I am logged in ensek', () => {
  cy.request({
    method: 'POST',
    url: `${baseEndpoint}/login`,
    headers: {
      accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: {
      username: 'test', 
      password: 'testing',
    },
  }).then((res) => {
    cy.log('Login Response Body:', JSON.stringify(res.body));
    const token = res.body.access_token; 
    if (!token) {
      throw new Error(`Token was not found in the login response. Response structure: ${JSON.stringify(res.body)}`);
    }
    cy.wrap(token).as('authToken'); 
    cy.wrap(res).as('loginResponse'); 
  });
});


Then('the response should include a success message', () => {
  cy.get('@loginResponse').then((response) => {
    expect(response.status).to.eq(200); 
  });
  cy.get('@loginResponse').then((response) => {
    cy.log('Login Success Message:', response.body.message); 
    expect(response.body).to.have.property('message').that.contains('Success'); 
  });

});

When('I reset the data', () => {
  cy.get('@authToken').then((authToken) => {
    cy.request({
      method: 'POST',
      url: `${baseEndpoint}/reset`,
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${authToken}`, 
        'Content-Type': 'application/json',
      },
      body: {},
    }).then((res) => {
      cy.log('Reset Response Body:', JSON.stringify(res.body)); 
      cy.wrap(res).as('resetApiResponse'); 
    });
  });
});

Then('the reset response should include a success message', () => {
  cy.get('@resetApiResponse').then((response) => {
    expect(response.status).to.eq(200); 
  });
  cy.get('@resetApiResponse').then((response) => {
    cy.log('Reset Success Message:', response.body.message); 
    expect(response.body).to.have.property('message').that.contains('Success'); 
  });
});
