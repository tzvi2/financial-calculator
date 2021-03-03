const investmentPage = document.getElementById('investment_page');
const propertyPage = document.getElementById('property_page')
const investmentResultBtn = document.getElementById('investment_results_button')
const propertyResultBtn = document.getElementById('property_results_button')

// navigation //

$('#investment_page_link').click(goToInv)
$('#property_page_link').click(goToProp)

function goToInv() {
    propertyPage.style.display = 'none'
    investmentPage.style.display = 'flex'
    $('#investment_page_link').toggleClass('active', true)
    $('#property_page_link').toggleClass('active', false)
}

function goToProp() {
    investmentPage.style.display = 'none'
    propertyPage.style.display = 'flex'
    $('#property_page_link').toggleClass('active', true)
    $('#investment_page_link').toggleClass('active', false)
}

// assign function to results buttons

$(investmentResultBtn).click(getInvestResults)
$(propertyResultBtn).click(getPropResults)

// calculate investment //

function getInvestResults() {

    $('#investment_result_text').text('')

    let total = 0;

    // check that valid inputs were filled out

    if($('#initial_balance').val() === '' && $('#monthly_investment').val() === '') {
        alert('Please Enter Initial Balance and/or Monthly Investment')
        return
    }

    if($('#monthly_investment').val() === '' && $('interest_rate').val() === '') {
        alert('Please Enter Monthly Investment and/or Interest Rate')
    }

    if($('#total_years').val() === '') {
        alert('Please Enter Total Years')
        return
    }

    //prevent user from entering negative interest rate

    if($('#interest_rate').val() < 0) {
        alert('You Cannot Enter A Negative Interest Rate')
        document.getElementById('interest_rate').value = ''
        return
    }

    let initial = $('#initial_balance').val() === '' ? 0 : Number($('#initial_balance').val())
    let monthlyAmount = $('#monthly_investment').val() === '' ? 0 : Number($('#monthly_investment').val())
    let interestRate = $('#interest_rate').val() === '' ? 0 : Number($('#interest_rate').val() / 100)
    let totalYears = Number($('#total_years').val())

    // has user entered a monthly contribution - yes: true, no: false
    let hasMonthlyContribution = (monthlyAmount !== 0)

    // has user entered interest rate
    let hasInterest = (interestRate !== 0)

    if(hasInterest) { // interest rate inputted
        total = (initial * (Math.pow(1 + interestRate / 12, 12 * totalYears))) 
        if(hasMonthlyContribution) { // monthly contribution inputted
            total += (monthlyAmount * (Math.pow(1 + interestRate / 12, 12 * totalYears) -1 ) / (interestRate / 12))
        }
    }
    else { // no interest rate inputted
        total = initial + (monthlyAmount * 12 * totalYears)
    }

    total = total.toFixed(2)
    $('#investment_result_text').css('visibility', 'visible').append('You\'ll have $'+ total.replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' after '+totalYears+' year(s).' )
}

// property stuff

function getPropResults() {

    let propCostField = document.getElementById('initial_cost') 
    let propTaxField = document.getElementById('taxes')
    let expenseField = document.getElementById('expenses')

    $('#property_income_text').text('')
    $('#property_break_even_text').text('')
    let annualIncome = 0;
    let breakEven = 0;

    let initial = $('#initial_cost').val() === '' ? 0 : parseInt($('#initial_cost').val())
    let rentIncome = $('#rent_income').val() === '' ? 0 : parseInt($('#rent_income').val())
    let tax = $('#taxes').val() === '' ? 0 : parseInt($('#taxes').val()) / 100
    let annualTaxAmount = initial * tax
    console.log(annualTaxAmount)
    let expenses = $('#expenses').val() === '' ? 0 : parseInt($('#expenses').val())

    if(rentIncome === 0) { 
        alert('Please Enter Rent Income') 
        return 
    }

    // default to 0 for empty fields
    if(initial === 0) propCostField.value = 0
    if(tax === 0) propTaxField.value = 0
    if(expenses === 0) expenseField.value = 0

    annualIncome = (rentIncome * 12) - annualTaxAmount - expenses
    breakEven = (initial / rentIncome) / 12
    
    $('#property_income_text').append('Annual profit: $' + annualIncome.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")).css('visibility', 'visible')
    if(annualIncome > 0) {
        $('#property_break_even_text').append('It will take ' + breakEven.toFixed(1) + ' years to make back property cost.').css('visibility', 'visible')
    }

}