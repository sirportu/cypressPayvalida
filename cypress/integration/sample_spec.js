describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        cy.visit('https://pagostore.com/');

        const sql = 'SELECT * FROM Payvalida';

        cy.sqlServer(sql).should(res=>{
            console.log(res);
            res.forEach(element => {
                cy.get(':nth-child(1) > ._3TqH_GzIKGvl5zE4o8qVY_ > div > ._2snGchWsjFpMyNZLH-C5ri').click();
                cy.get(':nth-child(2) > ._3jRy4bFslx-is1l6hENAvR').click();
                cy.get('.oxVbmPqVSkCVx79GnnLc7').type(element[1]);
                cy.get('._3duKww4d68rWsj1YAVEbYt').click().wait(3000);
                cy.document().then($document => {
                    if($document.getElementsByClassName('_3Acc8sy0yvH4wIM24x2OgV').length > 0) {
                        cy.get('._3Acc8sy0yvH4wIM24x2OgV').click();
                        console.log('REGION INVALIDA');
                    }
                    if($document.getElementsByClassName('_3sYGlvN9b3AEZixLIfPEyv').length == 0) {
                        console.log('numero de elementos');
                        cy.get('._3itcD-Pl_RmzhuigTd5VQN > div').children('a')
                        .each(($el, index, $list) => {
                            return cy.get(':nth-child(' + (index+1) + ') > ._3V9DM0qZ5XUDQCKZboGom > ._1v4QMCKGPgfdVXYRO07us > div').invoke('text')
                            .then((text) => {
                                if(text.trim() == element[3]) {
                                    cy.get('._3itcD-Pl_RmzhuigTd5VQN > div:nth-child(2) > a:nth-child(' + (index+1) + ')').click();
                                    cy.get('.lJ9k22FLin9df3ckrL8wL > .oxVbmPqVSkCVx79GnnLc7').type(element[1] + '@negocioefectivo.com');
                                    cy.get('._3duKww4d68rWsj1YAVEbYt').click();
                                    cy.get('#mat-checkbox-1 > label > .mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin').click();
                                    cy.get('.col-10 > .mat-focus-indicator').click();
                                    return cy.get('.boxTransaction > :nth-child(1) > :nth-child(2)').invoke('text')
                                    .then((text2) => {
                                        let referencia = text2.replace('Número de referencia de pago: ', '');
                                        cy.sqlServer("UPDATE Payvalida SET referenciaPago = '" + referencia + "' WHERE idJugador = '" + element[1] + "'");
                                        cy.visit('https://pagostore.com/app/100067/buy/0');
                                        return false;
                                    });
                                } else {
                                    if($list.length == (index+1)) {
                                        cy.get('._2dyYX5pthjwDNmIYcbO2v_ > :nth-child(2)').click();
                                    }
                                }
                            });
                        });
                    } else {
                        if ($document.getElementsByClassName('_3sYGlvN9b3AEZixLIfPEyv')[0].innerText == 'ID de jugador inválido') {
                            cy.get('._2vrDwSjCqOBOzET5QNn5oK').click();
                        }
                        else {
                            debugger;
                            Cypress.client.decodeRecaptchaV2({
                                googlekey: '6LcW7R4dAAAAAH1VxYPJRq38L2vzKaegSLV05ilc',
                                pageurl: 'https://pagostore.com/app'
                            }).then(function(response) {
                                console.log(response.text);
                            });
                        }
                    }
                });
            });
        });
    })
})