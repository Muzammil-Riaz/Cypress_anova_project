import AnovaPage from '../../pages/anovatestUIPage';

const objAnova = new AnovaPage();
 
describe('Automation Test Suite ', function()
{
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })
    
    it('Login', function() {
        objAnova.login_with_correct_credentials();
    })

    it('Get a list of available products', function() {
        objAnova.get_a_list_of_available_products();
    })

     it('Add a new product', function() {
        objAnova.add_new_product();
    })
})