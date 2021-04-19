import AnovaPage from '../../pages/anovatestUIPage';

const objAnova = new AnovaPage();
 
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
        objAnova.login_with_correct_credentials(username,password);
    })

    it('Get a list of available products', function() {
        objAnova.get_a_list_of_available_products();
    })

     it('Add a new product', function() {
        objAnova.add_new_product();
    })
})
