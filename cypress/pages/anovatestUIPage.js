class anovatestUIPage {
  //LOCATORS
  login_username_id = "#username-input"
  login_next_button_xpath = "//span[contains(text(),'Next')]"
  login_password_id = "#password-input"
  login_login_button_xpath = "//span[contains(text(),'Login')]"

  products_table_selector = ".MuiTableRow-root"
  products_add_product_xpath = "//span[contains(text(),'Add Product')]"

  create_product_name_id = "#name-input"
  create_product_description_id = "#description-input"
  create_product_group_id = "#productGroup-input"
  create_specific_gravity_id = "#specificGravity-input"

  save_and_close_button_xpath = "//span[contains(text(),'Save & Close')]"


  login_with_correct_credentials() {
    cy.fixture("config.json").then(config => {
      const username = config["username"]
      const password = config["password"]
      const url1 = config["url1"]
      const endpoint1 = config["apiendpoint1"]

      cy.visit(url1); //website 

      cy.get(this.login_username_id) //username
        .should("be.visible")
        .click()
        .type(username)

      cy.xpath(this.login_next_button_xpath) //clicking on the next button
        .should("be.visible")
        .click()

      cy.get(this.login_password_id) //password
        .should("be.visible")
        .click()
        .type(password)

      cy.xpath(this.login_login_button_xpath) //clicking on the login button
        .should("be.visible")
        .click()

      cy.get('body').then(body => {   //checking whether the modal is opening after successfull login
        if (body.find('.MuiDialog-container > .MuiPaper-root').length > 0) {
          cy.get('.MuiIconButton-label > .MuiSvgIcon-root')
            .should("be.visible")//closing that modal
            .click()
        }
      })

      cy.intercept
        ({
          method: "POST",
          url: endpoint1,
        })
        .as("pageload1")
      cy.wait("@pageload1")

      cy.intercept
        ({
          method: "POST",
          url: "/RetrieveDomainApplicationInfoById",
        })
        .as("pageload2")
      cy.wait("@pageload2")

      cy.intercept
        ({
          method: "POST",
          url: "/GetDomainAdditionalById",
        })
        .as("pageload5")
      cy.wait("@pageload5")

      cy.get('body').then(body => {   //checking whether the modal is opening after successfull login
        if (body.find('.MuiDialog-container > .MuiPaper-root').length > 0) {
          cy.get('.MuiIconButton-label > .MuiSvgIcon-root')
            .should("be.visible")//closing that modal
            .click()
        }
      })
    })
  }

  get_a_list_of_available_products() {
    cy.get(this.products_table_selector)   //verifying that the product is added or not.
      .should("be.visible")
      .find(".MuiTableCell-root.MuiTableCell-body")
      .contains("Hydrogen")     //assertion to check the products 
  }

  add_new_product() {

    cy.fixture("config.json").then(config => {
      const username = config["username"]
      const password = config["password"]
      const endpoint1 = config["apiendpoint1"]
      const endpoint2 = config["apiendpoint2"]
      const endpoint3 = config["apiendpoint3"]

      cy.request({
          method: 'POST',
          url: endpoint1,
          body: { userName: username, password: password }
        })
        .then((response) => {
          expect(response).to.have.property('status', 200)

          cy.xpath(this.products_add_product_xpath) //adding new product
            .should("be.visible")
            .click()

          cy.get('body').then(body => {
            if (body.find('MuiTypography-root.MuiTypography-body2.MuiTypography-colorError').length > 0) {
              cy.get('.MuiSvgIcon-root')
                .eq(3)
                .click()

              cy.xpath(this.products_add_product_xpath) //adding new product
                .should("be.visible")
                .click()
            }
          })

          cy.get(this.create_product_name_id)  //filling the fields (product name)
            .should("be.visible")
            .type("test Muz 4")

          cy.get(this.create_product_description_id) //description
            .should("be.visible")
            .type("product test")

          cy.get(this.create_product_group_id) //product group
            .should("be.visible")
            .type("Test")

          cy.get(this.create_specific_gravity_id) //specific gravity
            .should("be.visible")
            .type("1")

          cy.xpath("//span[contains(text(),'Select')]")
            .click()

          cy.get('#menu-displayUnit > .MuiPaper-root > .MuiList-root') //display units
            .find('[data-value="60"]')
            .should("be.visible")
            .click()

          cy.xpath(this.save_and_close_button_xpath)
            .click()

          cy.intercept
            ({
              method: "POST",
              url: endpoint2,
            })
            .as("pageload3")
          cy.wait("@pageload3")

          cy.get(this.products_table_selector)   //verifying that the product is added or not.
            .should("be.visible")
            .find(".MuiTableCell-root.MuiTableCell-body")
            .contains("test Muz 4")
        })
    })
  }
}

export default anovatestUIPage
