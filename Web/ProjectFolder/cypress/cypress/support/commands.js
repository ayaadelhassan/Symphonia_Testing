// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
import 'cypress-file-upload';
Cypress.Commands.add('Login',(email,pass) => {
    cy.get("#login-username").type(email) //typing the email
     cy.get("#login-password").type(pass) //typing in the password
     cy.contains("Remember me").click()
     cy.get("#login-button").click()
 
 })

 Cypress.Commands.add('uploadFile', (fileNamePath, fileName, fileType = ' ', selector) => {
    cy.get(selector).then(subject => {
        cy.fixture(fileNamePath, 'base64')
            .then(Cypress.Blob.base64StringToBlob)
            .then(blob => {
                const el = subject[0]
                const testFile = new File([blob], fileName, {
                    type: fileType
                })
                const dataTransfer = new DataTransfer()
                dataTransfer.items.add(testFile)
                el.files = dataTransfer.files
            })
    })
    })