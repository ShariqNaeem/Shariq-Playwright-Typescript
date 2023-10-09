# Shariq-Playwright-Typescript

This project is a demonstration of automated testing using **Playwright** with **TypeScript** for the **DEMOQA** Application.

## Getting Started

### Install Dependencies
Navigate to the project root directory and run the following command to install the necessary dependencies:

```npm install```

or

```npx playwright install```


### Running the Test Cases
You can run the test cases using the following npm scripts:

* To run all test cases in the Chrome browser:

```npm run chrome-all-tests```

* To run all API test cases in the Chrome browser:

```npm run chrome-api-tests```

* To run all UI test cases in the Chrome browser:

```npm run chrome-ui-tests```

* To run all test cases in all supported browsers:

```npx playwright test```


### Project Structure
The project structure is organized as follows:

* test/ui: Contains all the **UI** test cases.
* test/api: Contains all the **API** test cases.
* page-objects: Contains all the page files where locators and functions are defined for **code reusability**.
* test-data: Contains data used in UI and API test cases, following a **data-driven** approach.
* utils: Contains **utility** functions, including request calls **(POST and DELETE)** and a random string generator for usernames (useful for creating new users in tests).
* resources: Contains files and images used in test cases for uploading files during student registration.

Feel free to explore the project structure and customize it according to your requirements.
