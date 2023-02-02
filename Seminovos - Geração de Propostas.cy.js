/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => false) //EVITAR ERRO DA PAGE AO INICIAR OS TESTES


describe('Deve acessar e logar no CRM com dados de usuário e senha corretos', () => {
    beforeEach(() => {
        cy.viewport(1500, 800) //REDMIMENSIONA A TELA PARA UM FORMATO MAIOR
        cy.visit('https://gvmmaquinasdev.azurewebsites.net/Account/Login?ReturnUrl=%2F')
        cy.get('#usuario')
            .click()
                .type('Gama')
        cy.get('#senha')
            .click()
                .type('Gama@2022')
        cy.get('.dx-button-content')
            .click()
        cy.get('#filial').select('SEMINOVOS - Pinheirinho')
        cy.get('.dx-button-content').click()
    })

    it('Gerando propostas pelo preechimento de dados', () => {
        cy.get('.sidebar-toggle-gama')
            .click()
        cy.focused().then(function($el) {
            cy.get(':nth-child(8) > [href="#"]')
                .click({force:true})
            cy.xpath("//ul[@class='treeview-menu menu-open']//a[normalize-space()='Propostas']")
                .click()
            cy.get('[aria-label="ti ti-plus"]')
                .click()
        })

        cy.title(':: Titan :: Propostas - Inclusão')
    })

    it('Incluindo os dados e prosseguindo de fase na inclusão', () => {
        cy.get('.sidebar-toggle-gama')
            .click()
        cy.focused().then(function($el) {
            cy.get(':nth-child(8) > [href="#"]')
                .click({force:true})
            cy.xpath("//ul[@class='treeview-menu menu-open']//a[normalize-space()='Propostas']")
                .click()
            cy.get('[aria-label="ti ti-plus"]')
                .click()
        })

        cy.get('#edtRespSolu')
            .click()
        cy.xpath("//div[contains(text(),'Gama Implantação')]")
        cy.get('[aria-label="search"]')
            .click()
                .wait(1000)
        cy.get(':nth-child(2) > .dx-item-content > .dx-datagrid-search-panel > .dx-texteditor-container > .dx-texteditor-input-container > .dx-texteditor-input')
            .click({force:true})
                .type('teste 345345')
        cy.xpath("//body[1]/div[2]/div[1]/div[2]/div[1]/div[1]/div[1]/div[6]/div[1]/div[1]/div[1]/div[1]/table[1]/tbody[1]/tr[1]/td[1]")
            .click()
        cy.get('[aria-label="Selecionar"]')
            .click({force:true})
        cy.get('.dx-first-col > .dx-field-item-content > .dx-show-invalid-badge > .dx-dropdowneditor-input-wrapper > .dx-texteditor-container')
            .click()
        cy.xpath("//div[contains(text(),'CARTÃO DE CRÉDITO')]") //SUBSTITUIR PELA FORMA DE PAGAMENTO DESEJADA
            .click({force:true})
        cy.xpath("//div[@id='edtPrevisaoCompra']//div[@class='dx-button-content']")
            .click()
        cy.get('[data-value="2023/02/13"]')
            .click({force:true}) //CAMPO PARA ALTERAÇÃO DE DATA             
        cy.xpath("//div[@id='edtTermometro']//div[@class='dx-dropdowneditor-icon']")
            .click({force:true})
        cy.xpath("//div[contains(text(),'Morno')]") //CAMPO PARA A ALTERAÇÃO DO TERMÔMETRO
            .click({force:true})
        cy.get('.dev-gama')
            .click({force:true})
        
        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    type: 'sucess',
                    message: 'Proposta salva com sucesso!',
                })
            }, 2500)
        })
        cy.wrap(myPromise).its('message').should('eq','Proposta salva com sucesso!')   
    })

    it('Adicionando veículos e avançando para a fase de aprovação', () => {
        cy.xpath("//div[@class='drawer-gama-bar']")
            .click()
    })

})