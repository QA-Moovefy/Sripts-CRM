import 'cypress-xpath';
import commands from '../../support/Commands-CRM/commands'

function numeroAleatorio() { //função gerar numero aleatorio para concatenar no titulo
    return Math.floor(1000 + Math.random() * 9000)
}
function diaDeHoje() { //funcao gerar data do dia de hoje
    const hoje = new Date()
    const dia = String(hoje.getDate()).padStart(2, '0')
    const mes = String(hoje.getMonth() + 1).padStart(2, '0')
    const ano = String(hoje.getFullYear())

    return `${dia}/${mes}/${ano}`;
}
const idOportunidade = numeroAleatorio()
const dataPrevista = diaDeHoje()
const tituloOportunidade = `Oportunidade via automação ${idOportunidade}`
const cliente = '69371934000136' //cliente
var filial = '96e029a5-3766-41c9-bb90-8ad4825e157b' //Filial Vamos Locação

describe('Automação do fluxo de oportunidade para geração de contratos no PDV', () => {
    
    beforeEach(() => { //caso precise realizar login novamente
        cy.viewport(1280, 720)
        cy.visit('https://gamamaquinashmlg.azurewebsites.net/Account/Login?ReturnUrl=%2F')
        
        cy.get('#usuario').type('gama')
        cy.get('#senha').type('Moovefy@2024')
        cy.get('div[class=\'dx-button-content\']').click()
        cy.get('#filial').select(filial)
        cy.get('div[class=\'dx-button-content\']').click({force:true}).wait(2000)
    })
    
    it('Gerando oportunidade', () => {
        
        cy.visit('https://gamamaquinashmlg.azurewebsites.net/CRM/NovaOportunidade/Quadro')
        
      //Informações Oportunidade
        cy.get('#btn-oportunidade').click()

        //buscar cliente
        cy.get('#btnoporSearch').click()
            cy.wait(3500)
        cy.xpath('//div[@class=\'dx-editor-with-menu\']//input[@aria-describedby=\'dx-col-40\']')
            .type(cliente, {force:true}).wait(2000)
        cy.get('.dx-data-row > [aria-describedby="dx-col-39"]').click({force:true})
        cy.xpath('//div[@style=\'float:right;padding-left:10px\']').click()

        //informações Oportunidade 
        cy.xpath('//input[@name=\'Nome\']').type(tituloOportunidade)
        cy.xpath('//div[@id=\'dataPrevista\']')
            .click({force:true}).type(dataPrevista)
       cy.xpath('//div[@id=\'slbStatus\']').type('{downArrow}{downArrow}{downArrow}{enter}')
        

      //Tipo Cotação
        cy.xpath('(//div[@class=\'dx-item-content dx-tab-content\'])[2]')
            .click({force:true})
        cy.get('div[aria-label^=\'Nova\'] div').click()
        cy.xpath('//div[@class=\'titulo-planos\' and text()=\'VAMOS\']')
            .click({force:true})
        cy.get('.btn').click({force:true})
      //fim

      // Infomações cotação
        cy.xpath('//div[@id=\'tbPrazLoca-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'60 meses\']')
            .click({force:true})

        //tipo cotaçao
        cy.xpath('//*[@id=\'slbTipoCota-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'Agro\']')
            .click({force:true})

        //multa devolução
        cy.xpath('//*[@id=\'slbMultDevo-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'100% DAS PARCELAS VICENDAS\']')
            .click({force:true})

        //reajuste
        cy.xpath('//*[@id=\'slbReaj-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'IPCA\']')
            .click({force:true})

        //estado e região 
        cy.xpath('//*[@id=\'slbEstado-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'AC\']')
            .click({force:true})

        cy.xpath('//*[@id=\'slbRegiao-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'SUL\']')
            .click({force:true})

        //tipo plano 
        cy.xpath('//*[@id=\'slbCondPag-1\']').click()
        cy.xpath('//div[@class=\'dx-item-content dx-list-item-content\' and text()=\'Dia 1\']')
            .click({force:true})
        // fim

      // //add veiculo
        cy.get('#add-veiculo').click()

        //tipo Ativo
        cy.wait(2500)
        cy.xpath('//div[contains(text(), \'VEICULO PESADO\')]').click()
        cy.get('div[aria-label=\'Avançar\'] div').click()

        //Categoria 
        cy.xpath('//div[@class=\'card-lista\']//div[contains(text(), \'CAMINHÃO VOCACIONAL\')]').click({force:true})
        cy.get('div[aria-label=\'Avançar\'] div').click()

        //Informações 
        cy.get('#slbVeiculoCondicao').click().wait(500)
        cy.xpath('(//div[@class=\'dx-item dx-list-item\']//div[contains(text(), \'Novo\')])[1]').click({force:true})
        cy.xpath('//div[@class=\'dx-item dx-radiobutton\']//div[contains(text(), \'Km/Mensal\')]').click()
        cy.get('#edtKm').type('1')
        cy.get('div[aria-label=\'Avançar\'] div').click()

        //Modelo
        cy.wait(3000)
        cy.xpath('(//div[@class=\'card-lista cinza\'])[1]').click({force:true})
        cy.get('div[aria-label=\'Avançar\'] div').dblclick()
        cy.get('#btnAdicionar').click({force:true}).wait(2500)
       // //fim 

      //Salvando e validando criacao 
        cy.get('#btnSalvar').click({foce:true}).wait(5000)
        cy.xpath('//*[@id=\'txtPesquisa\']').type(tituloOportunidade)
        cy.get('#BtnTxtPesquisa').click().wait(2500)
        cy.xpath('//div[@class=\'card-oportunidade-titulo hover\']')
            .should('contain.text', tituloOportunidade).then(() => {
                cy.log('Contrato criado com sucesso')
       })
    })
    
    it.only('Passando oportinidade na fase de cotação -> precificação', () => {
        
        cy.visit('https://gamamaquinashmlg.azurewebsites.net/CRM/NovaOportunidade/Quadro')
    })
})
