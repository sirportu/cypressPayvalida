describe('My First Test', () => {
    it('Visits the Kitchen Sink', () => {
        const ConsultarPayvalida = () => {
            try{
                console.log('PASO 1');
                cy.wait(20000);
                const sql = 'SELECT * FROM TransaccionProcesarTemp WHERE vchUrlReferenciaPago IS NOT NULL AND vchReferenciaPago IS NULL AND bitIDJugadorValido = 1';
                cy.sqlServer(sql).should(res=> {
                    if(res && res.length > 0 && !Array.isArray(res[0])) {
                        res = [res];
                    }
                    console.log('PASO 2 - ' + res.length);
                    for(let index = 0 ; index < res.length ; index++) {
                        cy.visit(res[index][22]);
                        cy.get('#mat-checkbox-1 > label > .mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin').click();
                        cy.get('.col-10 > .mat-focus-indicator').click().wait(1000);
                        cy.document().then($document => {
                            console.log('PASO 3');
                            let referencia = $document.querySelector('.boxTransaction > :nth-child(1) > :nth-child(2)').innerText;
                            referencia = referencia.replace('Número de referencia de pago: ', '');
                            cy.sqlServer("UPDATE TransaccionProcesarTemp SET vchReferenciaPago = '" + referencia + "' WHERE intCodigoTransaccionBemovilTemp = '" + res[index][0] + "'");

                            if((index+1) == res.length) {
                                console.log('PASO 4');
                                ConsultarPayvalida();
                            }
                        });
                    }

                    if(res.length == 0) {
                        ConsultarPayvalida();
                    }
                });
            }
            catch{
                console.log('REVENTO Y REINTENTAMOS');
                ConsultarPayvalida();
            }
        };  
        
        ConsultarPayvalida();
    });
});