///<reference types="cypress"/>

describe('assignment', () => {
  
  //visit demoqa.com before each testcase
  beforeEach(()=>{
    cy.visit('https://demoqa.com/',{ timeout:30000 })
  })
   //Scenario A- Verify user can enter new data into the table
  it('1-TC01', () => {
    cy.get('.category-cards > :nth-child(1)').click()
    cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click()
    let count=0
    //check row count
    cy.get('.ReactTable ').find('.rt-tbody').find('.rt-tr') .then((row) => {
      row.toArray().forEach((e) => {
       if (e.innerHTML.includes("Legal")) {       
        count =row.index(e)
      cy.log(count)
      ;}})

       })
    cy.get('#addNewRecordButton').click({force: true})

    cy.get('#firstName').type("Alden",{force: true})
    cy.get('#lastName').type("Cantrell",{force: true})
    cy.get('#userEmail').type("test@test.com",{force: true})
    cy.get('#age').type("30",{force: true})
    cy.get('#salary').type("12345",{force: true})
    cy.get('#department').type("QA",{force: true})
    cy.get('#submit').click({force: true})
    //check new row added to table
    cy.get('.ReactTable').find('.rt-tbody').find('.rt-tr').then((tr) => {
      tr.toArray().forEach((e) => {
       if (e.innerHTML.includes("QA")) { 
        cy.log(tr.index(e))
       expect(tr.index(e)).to.equal((count)+1)
        ;}})
      })
      //verify td 's content 
    cy.contains("QA").parent().then((rowdata)=>{
    cy.wrap(rowdata).contains("Alden")
    cy.wrap(rowdata).contains("Cantrell")
    cy.wrap(rowdata).contains("test@test.com")
    cy.wrap(rowdata).contains("30")
    cy.wrap(rowdata).contains("12345")    
    })
    
})

//Scenario B - Verify user can edit the row in a table
it('2-TC01', () => {
  cy.get('.category-cards > :nth-child(1)').click()
  cy.get(':nth-child(1) > .element-list > .menu-list > #item-3').click()
  cy.get("#edit-record-2") .click()
  cy.get('#firstName').clear().type("Gerimedica",{force: true})
  cy.get('#lastName').clear().type("BV",{force: true})
  cy.get('#submit').click({force: true})

   //verify td 's content  
  cy.contains("BV").parent().then((rowdata)=>{
    cy.wrap(rowdata).contains("Gerimedica")
          
    })
})
//Verify broken image
it('3-TC02', () => {

 cy.get('.category-cards > :nth-child(1)').click()
  cy.get(':nth-child(1) > .element-list > .menu-list > #item-6').click()

  cy.get('[src="/images/Toolsqa_1.jpg"]').should('be.visible')
  .and($pic => expect($pic[0].naturalWidth).to.be.eq(0))
})
//Verify user can submit the form.
it('4-TC03', () => {

  cy.get('.category-cards > :nth-child(2)').click()
  cy.get(':nth-child(2) > .element-list > .menu-list > #item-0').click()

  cy.get('#firstName').type("Gerimedica",{force: true})
  cy.get('#lastName').type("BV",{force: true})
  cy.get('#userEmail').type("test@test.com",{force: true})
  cy.get('input[value="Male"]').check({force: true})
  cy.get('#userNumber').type("0123456789",{force: true})

  cy.get('#dateOfBirthInput').click()
  cy.get('.react-datepicker__year-select').select('1990')
  cy.get('.react-datepicker__day').contains("15").click({force: true})
  //check rigth date selected 
  cy.get('#dateOfBirthInput').invoke('val').then((date) => {
    expect('15 Jan 1990').to.equal(date);
  })
  cy.get('#subjectsInput').type("Cypress Assignment",{force: true})

  cy.get('#hobbies-checkbox-2').check({force: true})

  cy.get('input[type=file]').selectFile('cypress/fixtures/Capture.PNG')

  cy.get('#currentAddress').type("Netherlands",{force: true})
  cy.get('#react-select-3-input').type("NCR{enter}",{force: true} )

  cy.wait(1000)

  cy.get('#react-select-4-input').type("Delhi{enter}",{force: true} )
  
  cy.get('#submit').click({force: true})
  cy.screenshot()
      
  //verify td 's content 
  cy.get('#example-modal-sizes-title-lg').within(($form)=>
  {
   cy.wrap($form).should('have.text',"Thanks for submitting the form")
  })
  cy.get('tbody > :nth-child(1) > :nth-child(1)').contains("Student Name").siblings().then((name)=>{
    cy.wrap(name).should('have.text',"Gerimedica BV")
  })
  cy.get('tbody > :nth-child(2) > :nth-child(1)').contains("Student Email").siblings().then((Email)=>{
    cy.wrap(Email).should('have.text',"test@test.com")
  })
  cy.get('tbody > :nth-child(3) > :nth-child(1)').contains("Gender").siblings().then((Gender)=>{
    cy.wrap(Gender).should('have.text',"Male")
  })
  cy.get('tbody > :nth-child(4) > :nth-child(1)').contains("Mobile").siblings().then((Mobile)=>{
    cy.wrap(Mobile).should('have.text',"0123456789")
  })
  cy.get('tbody > :nth-child(5) > :nth-child(1)').contains("Date of Birth").siblings().then((date)=>{
    cy.wrap(date).should('have.text',"15 January,1990")
  })
  cy.get('tbody > :nth-child(6) > :nth-child(1)').contains("Subjects").siblings().then((Subjects)=>{
    cy.wrap(Subjects).should('have.text',"")
  })
  cy.get('tbody > :nth-child(7) > :nth-child(1)').contains("Hobbies").siblings().then((Hobbies)=>{
    cy.wrap(Hobbies).should('have.text',"Reading")
  })
  cy.get('tbody > :nth-child(8) > :nth-child(1)').contains("Picture").siblings().then((Picture)=>{
    cy.wrap(Picture).should('have.text',"Capture.PNG")

  })
  cy.get('tbody > :nth-child(9) > :nth-child(1)').contains("Address").siblings().then((Address)=>{
    cy.wrap(Address).should('have.text',"Netherlands")
    
  })
  cy.get('tbody > :nth-child(10) > :nth-child(1)').contains("State and City").siblings().then((State)=>{
    cy.wrap(State).should('have.text',"NCR Delhi")
    
  })
  cy.get('#closeLargeModal').click({force: true})

  })
 //Verify the progress bar
  it.only('5-TC04', () => {
    cy.get('.category-cards > :nth-child(4)').click({force: true})
    cy.get(':nth-child(4) > .element-list > .menu-list > #item-4').click({force: true})
    cy.get('#startStopButton').click({force: true})
    cy.wait(15000)
    cy.get('.progress-bar').within(($progress)=>{
      cy.wrap($progress).should('have.attr','aria-valuenow','100').should('have.attr','class','progress-bar bg-success')

    }) 

  })

  //Verify the tooltip
  it('6-TC05', () => {
    cy.get('.category-cards > :nth-child(4)').click({force: true})
    cy.get(':nth-child(4) > .element-list > .menu-list > #item-6').click({force: true})
    cy.get('#toolTipButton').trigger('mouseover')
    cy.get('.tooltip-inner').should('be.visible').invoke('show').should("have.text","You hovered over the Button")
    



  })
  //Verify user can drag and drop
  it('7-TC06', () => {
    cy.get('.category-cards > :nth-child(5)').click({force: true})
    cy.get(':nth-child(5) > .element-list > .menu-list > #item-3').click({force: true})
    cy.wait(2000)
    cy.get('#draggable').trigger("mousedown",{which:1})
    cy.get('#droppable').trigger("mousemove").trigger("mouseup",{force:true})
    cy.get('#droppable').within((p)=>{
      cy.wrap(p).should("have.text","Dropped!")
    })

  })
  })

  









