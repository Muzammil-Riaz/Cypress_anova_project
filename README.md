# Cypress_anova_project


* TOOLS USED : Cypress & VS Code.
* METHODDOLOGY FOLLOWED : Page Object Model.
* OS : Windows
Before running the project, do the following things:
* Install latest version of Node.js 
* To install dependencies, use this command -> npm install. 
* Incase the above command is not enough, then install cypress using this command -> npm install cypress --save-dev (but if you are using Mac OS then instead of npm use npx) 
* To open cypress Test runner, run the following command in the VS Code termial. Make sure you have Node.js and cypress installed in your machine. Command : npm cypress:open 
* Test cases are present inside the integration folder followed by test cases folder. (/integration/testcases/) 
* Pages are present inside the pages folder. (/pages/) 
* config.json file is present inside fixtures folder in which most of the credentials, urls and parameters are present. 
* anovatestAPIPage.js file contains all the functions and requests, in order to execute API test cases. 
* anovatestUIPage.js file contains all the functions, requests, varibales and constants in order to execute UI test cases. 
* Test cases for API Automation are present in anovatestAPI_spec.js. 
* Test cases for UI Automation are present in anovatestUI_spec.js. 
* Also install the xpath plugin for cypress, because there are few xpaths used in these automation scripts. 
* You can check the results of every test case from the screenshots present inside Results folder.
