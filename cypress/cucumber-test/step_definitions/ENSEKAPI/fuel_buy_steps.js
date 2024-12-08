import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';

const baseEndpoint = 'https://qacandidatetest.ensek.io/ENSEK'; 


Then('I fetch energy details', () => {
    cy.get('@authToken').then((authToken) => {
      cy.request({
        method: 'GET',
        url: `${baseEndpoint}/energy`,
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${authToken}`,
        },
      }).then((res) => {
        cy.log('Energy Details Response:', JSON.stringify(res.body));
        expect(res.status).to.eq(200);
        expect(res.body).to.have.all.keys('electric', 'gas', 'nuclear', 'oil');
        const energyMap = new Map();
        Object.entries(res.body).forEach(([fuelType, details]) => {
          energyMap.set(fuelType, {
            energy_id: details.energy_id,
            price_per_unit: details.price_per_unit,
            quantity_of_units: details.quantity_of_units,
            unit_type: details.unit_type,
          });
        });
        energyMap.forEach((value, key) => {
            cy.log(`Energy Type: ${key}`, JSON.stringify(value));
        });
        cy.wrap(energyMap).as('energyMap'); 
      });
    });
});


When('I place orders for each energy type with quantity {int}', (orderQuantity) => {
    cy.get('@energyMap').then((energyMap) => {
      const orderResponses = [];
      energyMap.forEach((details, fuelType) => {
        const { energy_id } = details; 
        if (fuelType === 'nuclear') {
            cy.log(`Skipping order for ${fuelType}`);
            return; 
        }
        cy.log(`Placing order for ${fuelType} with ID: ${energy_id}`);
        cy.request({
          method: 'PUT',
          url: `https://qacandidatetest.ensek.io/ENSEK/buy/${energy_id}/${orderQuantity}`,
          headers: {
            accept: 'application/json',
          },
        }).then((res) => {
          expect(res.status).to.eq(200);
          cy.log(`Order Response for ${fuelType}:`, JSON.stringify(res.body));
          expect(res.body.message).to.match(/order.+/);
          orderResponses.push({
            fuelType,
            response: res.body,
          });
        });
      });
      cy.wrap(orderResponses).as('orderResponses');
    });
});
  

Then('all orders should be successful', () => {
    cy.get('@orderResponses').then((orderResponses) => {
      const orderIds = []; 
      orderResponses.forEach((orderResponse) => {
        const { response } = orderResponse;
        cy.log(`Verifying Order for with Order ID: ${response.message}`);
        const orderIdMatch = response.message.split('is')[1];
        cy.log(`Extracted Order ID: ${orderIdMatch}`);
        if (orderIdMatch) {
            expect(orderIdMatch.trim()).to.not.be.empty;
            orderIds.push(orderIdMatch.trim()); 
        } else {
          cy.log('Order ID not found in the response message');
          throw new Error('Order ID is missing or Invalid');
        }
      });
      cy.wrap(orderIds).as('orderIds');
      cy.log('List of Order IDs:', JSON.stringify(orderIds));
    });
});

  