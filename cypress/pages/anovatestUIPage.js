//array used to compare the products 
var prods = ["R125", "Test2", "TestRamsha","Test","Hydrogen","Liquid","Methane Gas","Argon","CO2 LIN Mix","CO2","Helium","Nitrogen"];
class anovatestUIPage {
      //LOCATORS
      login_username_id                 = "#username-input";
      login_next_button_xpath           = "//span[contains(text(),'Next')]";
      login_password_id                 = "#password-input";
      login_login_button_xpath          = "//span[contains(text(),'Login')]";

      products_table_selector           = ".MuiTableRow-root";
      products_add_product_xpath        = "//span[contains(text(),'Add Product')]";

      create_product_name_id            = "#name-input";
      create_product_description_id     = "#description-input";
      create_product_group_id           = "#productGroup-input";
      create_specific_gravity_id        = "#specificGravity-input";
     
      save_and_close_button_selector    = ".MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-true";


    login_with_correct_credentials()
    {    
      cy.fixture("config.json").then(config => 
        {
          const username  = config["username"];
          const password  = config["password"];
          const url1 = config["url1"];
        
              cy.visit(url1); //website 
      
              cy.get(this.login_username_id) //username
                .should("be.visible")
                .click()
                .type(username);
      
              cy.xpath(this.login_next_button_xpath) //clicking on the next button
                .should("be.visible")
                .click();
                  
              cy.get(this.login_password_id) //password
                .should("be.visible")
                .click()
                .type(password);
      
              cy.xpath(this.login_login_button_xpath) //clicking on the login button
                .should("be.visible")
                .click();  
      
              cy.get('body').then(body => 
                {   //checking whether the modal is opening after successfull login
                  if (body.find('.MuiDialog-container > .MuiPaper-root').length > 0)
                  {
                      cy.get('.MuiIconButton-label > .MuiSvgIcon-root') //closing that modal
                        .click();
                  }
                })  
        })        
    }

    get_a_list_of_available_products()
    {
      for(var i = 1; i < 13 ;i++)
      {
          cy.get(this.products_table_selector)  //getting the existing products
            .eq(i)
            .find(".MuiTableCell-root.MuiTableCell-body")
            .eq(0)
            .contains(prods[i-1])      //assertion to check the products 
            .then(($div) => 
            {
              const text = $div.text()
              cy.log(text);            //display every product
            })
      }

    }  

      add_new_product()
      {

        cy.fixture("config.json").then(config => 
          {
            const username  = config["username"];
            const password  = config["password"];
            const endpoint1 = config["apiendpoint1"];
            const endpoint3 = config["apiendpoint3"]; 

              cy.request(
                { 
                method:'POST',
                url:'/AuthenticateAndRetrieveApplicationInfo', 
                body:{userName: 'muz@testautomation', password: '10Pearls!'}
                })
              .then((response) => 
                {
                    expect(response).to.have.property('status',200)  

                    cy.xpath(this.products_add_product_xpath) //adding new product
                      .should("be.visible")
                      .click();

                    cy.get('body').then(body => 
                      {   
                          if (body.find('MuiTypography-root.MuiTypography-body2.MuiTypography-colorError').length > 0)
                          {
                          cy.get('.MuiSvgIcon-root') 
                            .eq(3)
                            .click();

                          cy.xpath(this.products_add_product_xpath) //adding new product
                            .should("be.visible")
                            .click();  
                          }

                      }) 

                    cy.get(this.create_product_name_id)  //filling the fields (product name)
                      .should("be.visible")
                      .type("test Muz 2");

                    cy.get(this.create_product_description_id) //description
                      .should("be.visible")
                      .type("product test"); 

                    cy.get(this.create_product_group_id) //product group
                      .should("be.visible")
                      .type("Test"); 

                    cy.get(this.create_specific_gravity_id) //specific gravity
                      .should("be.visible")
                      .type("1");  

                    cy.xpath("//span[contains(text(),'Select')]")
                      .click();

                    cy.get('#menu-displayUnit > .MuiPaper-root > .MuiList-root') //display units
                      .find('[data-value="60"]')
                      .should("be.visible")
                      .click();

                    cy.xpath(this.save_and_close_button_selector)
                      .eq(2)
                      .click();

                    cy.wait(5000); //waiting for the new page to load

                    cy.get(this.products_table_selector)  //verifying that the product is added or not.
                      .find(".MuiTableCell-root.MuiTableCell-body")
                      .contains("test Muz");
                  }) 
          })   
      }
    }
   
     export default anovatestUIPage