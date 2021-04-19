import AnovaAPIPage from '../../pages/anovatestAPIPage';

const objAnova1 = new AnovaAPIPage();
 
describe('Automation Test Suite ', function() 
{ 
    before(() => {
        cy.fixture("config.json").then(config => 
            {
              const username  = config["username"];
              const password  = config["password"];
              const url1      = config["url1"];
              const endpoint1 = config["apiendpoint1"];
              const endpoint2 = config["apiendpoint2"];
              const endpoint3 = config["apiendpoint3"];
            })
    })

    beforeEach(function () {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })
    
    it('Login', function() {
        objAnova1.check_login_status();
    })
   
    it('Get a list of available products', function() {
        objAnova1.get_a_list_of_available_products();
    })

    it('Add a new product', function() {
        objAnova1.add_new_product();
    })    
})