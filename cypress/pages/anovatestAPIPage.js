class anovatestAPIPage 
{
    check_login_status()
    {
         cy.request({
            method:'POST',
            url:'/AuthenticateAndRetrieveApplicationInfo', 
            body:{userName: 'muz@testautomation', password: '10Pearls!'}
          })
           .then((response) => 
            {
                expect(response).to.have.property('status',200)
            })
    }  

    Get_a_list_of_available_products()
    {
      cy.request(
        {
        method:'POST',
        url:'/AuthenticateAndRetrieveApplicationInfo', 
        body:{userName: 'muz@testautomation', password: '10Pearls!'}
        })
        .then((response) => 
         {
          expect(response).to.have.property('status',200)  
          cy.request
          (
            {
              method:'POST',
              url:'/RetrieveProductRecordsByDomain',
              body:{domainId:'cc398962-1136-eb11-86c4-00155d55772b'},
            }) 
              .then((response) => 
              {
                expect(response).to.have.property('status',200)
                expect(response.body).to.not.to.be.null  
              })       
         })
    }
    
    Add_new_product()
    {  
      cy.request({ 
        method:'POST',
        url:'/AuthenticateAndRetrieveApplicationInfo', 
        body:{userName: 'muz@testautomation', password: '10Pearls!'}
      })
       .then((response) => 
        {
          expect(response).to.have.property('status',200)
          cy.request(
            { 
              method:'POST',
              url:'/RetrieveProductEditComponents', 
              body:{name: 'Test muz', description: 'Test Product', productGroup: 'Test', specificGravity: '1', displayUnits: '[data-value="60"]'}
            })
         .then((response) => 
          {
           expect(response).to.have.property('status',200)
          })
        })
    }    
}

     export default anovatestAPIPage