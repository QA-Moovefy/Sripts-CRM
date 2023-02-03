/// <reference types="cypress" />

Cypress.on('uncaught:exception', () => false)

describe('Deve acessar e logar no CRM com dados de usuário e senha corretos', () => {
    before(() => {
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
    
    it('Deve prosseguir com a criação de uma oportunidade', () => {
        cy.get(':nth-child(2) > .dropdown > .dropdown-toggle')
            .click()
        cy.title(':: Titan :: Minhas Mídias') //TELA DE MINHAS MÍDIAS    
        cy.get('.dropdown-menu > :nth-child(5)')
            .click()
        cy.get('[aria-label="Nova Mídia"]')
            .click()
        cy.get('#imagem-2-marketbook')
            .click()
        cy.get('[aria-label="Selecionar Mídia"]')
            .click()
        cy.get('#titulo-catalogo').click()
        cy.get(':nth-child(3) > .dx-item-content > [style="font-size: 0.8em;"]').click()
        cy.get('#aquisicao-catalogo').click()
        cy.xpath("//div[contains(text(),'Agro')]").click()
        cy.get('[aria-label="Criar Marketbook"]')
            .click({force:true})
    })

    afterEach('Gerando o novo marketbook', () => {
        cy.get('#info-usuario > .dx-widget > [aria-selected="false"] > .dx-radio-value-container > .dx-radiobutton-icon').click({force:true}) //EXIBE INFORMAÇÕES DO USUÁRIO
        cy.get('#redes-sociais > .dx-widget > [aria-selected="false"] > .dx-radio-value-container > .dx-radiobutton-icon').click({force:true}) //EXIBE REDES SOCIAIS
        cy.get('#localidade-veiculo > .dx-widget > [aria-selected="false"] > .dx-radio-value-container > .dx-radiobutton-icon').click({force:true}) //EXIBE LOCALIDADE DO VEÍCULO
        cy.get('[onclick="abrePopupBannerImagem(0)"]')
            .click()
        cy.get(':nth-child(4) > .dx-item-content > div > .img-banner-lista') //ADICIONA BANNER AO VEÍCULO
            .click()
        cy.get('[aria-label="CONFIRMAR"]') //CONFIRMA ADIÇÃO DE BANNER
            .click({force:true})
                .wait(500)
        
        cy.xpath("//div[@class='dx-item dx-tab']").should('be.visible')
            .dblclick()
                .wait(1000)

        //ADIÇÃO DOS VEÍCULOS -> SUBSTITUIR PELOS IDS DESEJADOS (EX: cy.get('#item-ID DO ITEM') )
        cy.get('#item-651827b0-7c6c-4477-a7c9-7d61f2db1e25').focused() //adiciona o primeiro veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-db1245ce-eca3-4b8a-b651-fff143e92095']") //adiciona o segundo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-87968fac-c5ee-433d-9f1a-e0957858d9e2']") //adiciona o terceiro veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-f71984dc-ee1b-433d-b635-96fe91094861']") //adiciona o quarto veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-9b1dab66-f65c-45b4-8dfc-9dc6efdd6da3']") //adiciona o quinto veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-9b1dab66-f65c-45b4-8dfc-9dc6efdd6da3']") //adiciona o sexto veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-602448b8-ec25-411d-9e68-89f4099aa406']") //adiciona o sétimo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)
        
        cy.xpath("//div[@id='item-5f97aef7-8441-4ba8-9ecb-27ea38a88959']") //adiciona o sétimo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-f71984dc-ee1b-433d-b635-96fe91094861']") //adiciona o oitavo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-9b1dab66-f65c-45b4-8dfc-9dc6efdd6da3']") //adiciona o novo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-f48f3ed2-1b71-4d02-8ac4-b58eb82fe41a']") //adiciona o décimo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)
        
        cy.xpath("//div[@id='item-bff7ffe6-5ebb-4d59-a695-9ef3a0ee5db6']") //adiciona o décimo primeiro veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)

        cy.xpath("//div[@id='item-7ba2228c-55f9-4361-a4db-9ebfc4ab443a']") //adiciona o décimo segundo veículo
            .click({force:true})
        cy.xpath("//div[@id='btn-selecionar-veiculo']//div[@class='dx-button-content']")
            .click({force:true})
                .wait(1000)
        
        cy.get('[aria-label="Finalizar Marketbook"]') //PROSSEGUE PARA FINALIZAÇÃO DO MARKETBOOK
            .click()

        const myPromise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve({
                    type: 'sucess',
                    message: 'Deseja finalizar seu Marketbook?',
                })
            }, 2500)
        })
        cy.wrap(myPromise).its('message').should('eq','Deseja finalizar seu Marketbook?')    

        cy.get('[aria-label="Sim"]')
            .click()
                .wait(3000) //tempo para gerar o Marketbook (salvamento)
        

        cy.contains('Sucesso ao Finalizar Marketbook!')
            .should('have.text','Sucesso ao Finalizar Marketbook!')
        
        cy.get('#numero')
            .type('14991204992') //INSERE O NÚMERO QUE RECEBERÁ O MARKETBOK VIA WHATASAPP
        
        cy.get('[aria-label="fas fa-paper-plane"]') //SELECIONA BOTÃO DE ENVIO
            .click()
    })
    
})
