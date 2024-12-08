Cypress.Commands.add('verifyATextInList', (selector, phrase) => {
    let found = false;
    return cy.get(selector).within(() => {
      cy.get('li').each(($li) => {
        if (found) return; // Exit if already found
        cy.wrap($li).find('p').then(($p) => {
          const messageText = $p.text();
          if (messageText.includes(phrase)) {
            found = true;
            return false; 
          }
        });
      });
    }).then(() => {
      return found;
    });
});