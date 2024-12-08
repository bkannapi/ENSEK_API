import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';


const baseEndpoint = 'https://qacandidatetest.ensek.io/ENSEK'; 


When('I view order lists', () => {
    cy.get('@authToken').then((authToken) => {
        cy.request({
            method: 'GET',
            url: `${baseEndpoint}/orders`,
            headers: {
                accept: 'application/json',
                Authorization: `Bearer ${authToken}`,
            },
        }).then((res) => {
            cy.log('Orders Response:', JSON.stringify(res.body));
            expect(res.status).to.eq(200);
            cy.wrap(res.body).as('orders_lists');
        });
    });
});

Then('I can confirm the number of orders created today', () => {
    cy.get('@orders_lists').then((orders) => {
        const currentDate = new Date().toISOString().split('T')[0]; // Get today's date in UTC
        let todayCount = 0;
        let oldCount = 0;
        orders.forEach((order) => {
            const orderTime = new Date(order.time).toISOString().split('T')[0];
            if (orderTime === currentDate) {
                todayCount++;
            } else if (orderTime < currentDate) {
                oldCount++;
            }
        });
        cy.log(`Today's Orders Count: ${todayCount}`);
        cy.log(`Old Orders Count: ${oldCount}`);
        expect(todayCount).to.be.a('number');
        expect(oldCount).to.be.a('number');
        cy.wrap({ todayCount, oldCount }).as('orderCounts');
    });
});
