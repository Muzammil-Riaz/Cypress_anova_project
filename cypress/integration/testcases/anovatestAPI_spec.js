import AnovaAPIPage from '../../pages/anovatestAPIPage';

const objAnova1 = new AnovaAPIPage();
 
describe('Automation Test Suite ', function() 
{
    beforeEach(function () {
        Cypress.Cookies.preserveOnce('session_id', 'remember_token')
    })
    
    it('Login', function() {
        objAnova1.check_login_status();
    })
   
    it('Get a list of available products', function() {
        objAnova1.Get_a_list_of_available_products();
    })

    it('Add a new product', function() {
        objAnova1.Add_new_product();
    })    
})