describe('pagina de login', () => {

  it('Login com sucesso', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    //preencher os campos de usuario e senha
    cy.get('#usuario').type('admin');
    cy.get('#senha').type('admin');
    cy.get('#entrar').click()

    cy.on('window:alert', (txt) =>{
      expect(txt).to.contains('Login efetuado!')
    });

  });

  it('Login com erro', () => {
    cy.visit('http://127.0.0.1:5500/index.html');

    cy.get('#usuario').type('1234');
    cy.get('#senha').type('errado');
    cy.get('#entrar').click()

    cy.get('#erro').should('be.visible')

  });

});


describe('Formulário de Cadastro', () => {
  beforeEach(() => {
      cy.visit('http://127.0.0.1:5500/cadastro.html'); 
  });

  it('Deve exibir mensagem de erro quando campos obrigatórios estiverem vazios', () => {
      cy.get('button[type="submit"]').click();
      
      cy.get('#erroMsg').should('exist'); 
      cy.get('#erroMsg').should('be.visible').and('contain', 'Por favor, preencha todos os campos.');
  });

  it('Deve exibir erro quando as senhas forem diferentes', () => {
      cy.get('#nome').type('Usuário Teste');
      cy.get('#email').type('usuario@teste.com');

      cy.get('#senha').type('senha123');
      cy.get('#confirmacaoSenha').type('senha1234');

      cy.get('button[type="submit"]').click();

      cy.get('#erroMsg').should('exist'); 
      cy.get('#erroMsg').should('be.visible').and('contain', 'As senhas não coincidem.');
  });

  it('Deve realizar o cadastro com sucesso quando todos os campos estiverem preenchidos corretamente', () => {
      cy.get('#nome').type('Usuário Teste');
      cy.get('#email').type('usuario@teste.com');
      cy.get('#senha').type('senha123');
      cy.get('#confirmacaoSenha').type('senha123');

      cy.get('button[type="submit"]').click();

      cy.get('#sucessoMsg').should('exist'); 
      cy.get('#sucessoMsg').should('be.visible').and('contain', 'Cadastro realizado com sucesso!');

      cy.get('#nome').should('have.value', '');
      cy.get('#email').should('have.value', '');
      cy.get('#senha').should('have.value', '');
      cy.get('#confirmacaoSenha').should('have.value', '');
  });
});
