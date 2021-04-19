class anovatestAPIPage 
{
    check_login_status()
    {
      cy.fixture("config.json").then(config => 
        {
          const username  = config["username"];
          const password  = config["password"];
          const endpoint1 = config["apiendpoint1"];
      
         cy.request({
            method:'POST',
            url: endpoint1, 
            body:{userName: username, password: password}
          })
           .then((response) => 
            {
                expect(response).to.have.property('status',200)
            })
        })     
    }  

    get_a_list_of_available_products()
    {
      cy.fixture("config.json").then(config => 
        {
          const username  = config["username"];
          const password  = config["password"];
          const domainId  = config["domainId"];
          const endpoint1 = config["apiendpoint1"];
          const endpoint2 = config["apiendpoint2"];
       
              cy.request({
                method:'POST',
                url: endpoint1, 
                body:{userName: username, password: password}
                })
                .then((response) => 
                {
                  expect(response).to.have.property('status',200)  
                  cy.request
                  (
                    {
                      method:'POST',
                      url: endpoint2,
                      body:{domainId:domainId}
                    }) 
                      .then((response) => 
                      {
                        expect(response).to.have.property('status',200)
                        expect(response.body).to.not.to.be.null  
                      })       
                })
        })      
    }
    
    add_new_product()
    {  
       cy.fixture("config.json").then(config => 
        {
          const username  = config["username"];
          const password  = config["password"];
          const endpoint1 = config["apiendpoint1"];
          const endpoint3 = config["apiendpoint3"];
          const prod_spec = config["prod_spec"];
      
                  cy.request({ 
                    method:'POST',
                    url: endpoint1, 
                    body:{userName: username , password: password}
                  })
                  .then((response) => 
                    {
                      expect(response).to.have.property('status',200)
                      cy.request({ 
                          method:'POST',
                          url: endpoint3, 
                          body:{prod_spec}
                        })
                    .then((response) => 
                      {
                      expect(response).to.have.property('status',200)
                      })
                    })
        })              
    }
                  
}

     export default anovatestAPIPage