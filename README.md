# Cypress Cucumber Automation Framework

This project is an automation framework built using Cypress and Cucumber for API tsting.

## Project Structure
.
├── cypress
│   ├── cucumber-test
│   │   ├── features
│   │   │   ├── authentication.feature.mp4
							    ├──energy_buy.feature.mp4
                                ├──orders_list.feature.mp4						 
│   │   │   
│   │   └── step_definitions
│   │       ├── ENSEKAPI
│   │       │   ├── authorisation_steps.js
                                    ├──fuel_buy_steps.js
                                    ├──orders_list_steps.js								
│   │       
│   ├── downloads
│   ├── fixtures
│   ├── plugins
│   │   └── index.js
│   ├── screenshots
│   ├── support
│   │   
│   └── videos
│       ├── dapiauto.feature.mp4
│       
├── cypress.config.js
├── package.json
├── package-lock.json
└── readme

To get started with this project, follow the steps below:

1. Download the project:

2.Load the visualstudiocode(VSCode)

3.Open the folder'ENSEK_API_SEND' in VSCode

4.Open the VScode terminal(sample command in terminal shown below)

(base) PS Cypress\ENSEK_API_SEND>

5.Install cypress for the project by running below command in terminal window
```
    npm install Cypress --save-dev
    ```

6. Install the dependencies:
    ```
    npm install
    ```
    Hit enter

## Project Dependencies

The project relies on the following main dependencies:

- Cypress: End-to-end testing framework
- Cucumber: Behavior Driven Development (BDD) framework

Refer to `package.json` for a complete list of dependencies.

## Running the Tests

You can run the tests using  below command:

 
```
npm run cyrun:headed
  
```

##  Viewing the Results

After running the tests, you can view the results in the terminal. The results will show the number of passing and failing tests.
The successful run alos recorded


## Screenshots and Videos
Cypress automatically captures screenshots and videos of test runs. These can be found in the following directories(post successful run of the test at the user machine):
ENSEK_API/cypress/videos 

## Folder Structure Details
cypress/cucumber-test/features: Contains the feature files written in Gherkin syntax.
cypress/cucumber-test/step_definitions/ENSEKAPI: Contains the steps for API
cypress/downloads: Directory for downloaded files during tests.
cypress/fixtures: Directory for fixture files.
cypress/plugins: Contains Cypress plugins.
cypress/screenshots: Directory where screenshots are saved.
cypress/support: Contains custom commands(ignore) and e2e setup.
cypress/videos: Directory where videos of test runs are saved.