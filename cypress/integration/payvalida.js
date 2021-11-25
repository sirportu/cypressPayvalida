describe("Referencias Pago Payvalida", () => {
  it("Procesar Referencias De Pago De Payvalida De Nhadasoft", () => {
    const ConsultarPayvalida = () => {
      try {
        console.log("PASO 1");
        cy.log("PASO 1");
        cy.wait(20000);
        const sql = "SELECT to.id,to.adicional01,(SELECT TOP 1 id FROM CatalogoDetalle WHERE valor = 'OBTENCION_REFERENCIA_OK') FROM TransaccionOffline to" + 
        "INNER JOIN CatalogoDetalle cd ON to.catalogoDetalleIdEstado = cd.id" +
        "WHERE to.adicional01 IS NOT NULL AND to.referenciaPago IS NULL AND cd.valor = 'REGISTRADA'";
        cy.sqlServer(sql).should((res) => {
          if (res && res.length > 0 && !Array.isArray(res[0])) {
            res = [res];
          }
          console.log("PASO 2 - " + res.length);
          cy.log("PASO 2 - " + res.length);
          for (let index = 0; index < res.length; index++) {
            cy.visit(res[index][1]);
            cy.get(
              "#mat-checkbox-1 > label > .mat-checkbox-inner-container.mat-checkbox-inner-container-no-side-margin"
            ).click();
            cy.get(".col-10 > .mat-focus-indicator").click().wait(1000);
            cy.document().then(($document) => {
              console.log("PASO 3 -" + index);
              cy.log("PASO 3 -" + index);
              let referencia = $document.querySelector(
                ".boxTransaction > :nth-child(1) > :nth-child(2)"
              ).innerText;
              referencia = referencia.replace(
                "Número de referencia de pago: ",
                ""
              );
              cy.sqlServer("UPDATE TransaccionOffline SET referenciaPago = '" +
                  referencia +
                  "', catalogoDetalleIdEstado = " + res[index][2] + " WHERE id = '" +
                  res[index][0] +
                  "'"
              );

              if (index + 1 == res.length) {
                console.log("PASO 4");
                cy.log("PASO 4");
                ConsultarPayvalida();
              }
            });
          }

          if (res.length == 0) {
            console.log("SIN DATOS VOLVEMOS A LLAMAR");
            cy.log("SIN DATOS VOLVEMOS A LLAMAR");
            ConsultarPayvalida();
          }
        });
      } catch {
        console.log("REVENTO Y REINTENTAMOS");
        cy.log("REVENTO Y REINTENTAMOS");
        ConsultarPayvalida();
      }
    };

    console.log("INICIAMOS");
    cy.log('INICIAMOS');
    ConsultarPayvalida();
  });
});
