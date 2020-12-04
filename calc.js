//we use constructor to default to values
class Calculate {
    constructor(prevResulted, mainResulted) {
        // the parameters like you already know in programming could be anything but 
        this.prevResultBtnText = prevResulted //  you can also actually reference the main variable itself of the queryselectors directly  and not the parameters e.g prevResultBtnTextElement 
        this.mainResultBtnText = mainResulted 
        this.allClear()
        console.log(this.prevResult);
    

        //I get the logic: this is what is happening : the variables this.prevResult and this.mainResult are all in the constructor already loaded via this.allClear() method/function...so  the value of this.prevResult and this.mainResult changes() with every time the button is clicked from line 60 or there about
    }
    allClear(){
        this.prevResult = ''
        this.mainResult = ''
        this.operation = undefined
        // we are setting the functio to undefined by sdefaul
      }
  
    delete(){
        this.mainResult = this.mainResult.toString().slice(0,-1)

    }

    insertNumber(number){

    if (number === "." && this.mainResult.includes('.')) return 
        //i get..so what is happening here is that: it is saying: if dot(".") is in the number parameter it should return the the value in (number parameter assigned to this.mainResult) or (you can say execute the next statement else don't execute..i think this is the best explanation )which we will display on our calc screen,

    /* if true, execute and return the statement below els prevent other statemnet from executing and we'll not actually append that number  */

    //this.mainResult.includes(".") prevents us from entering "."  more than once whe we click and also means that othet things can be included..you get? Inshort, it is the main checker because we first check if the number entered is dot and want to make sure that that dot is included in the number parameter, it will then execute the next statement..
    this.mainResult = this.mainResult.toString() + number.toString();// this to prevent js from adding it as a number but appending
    }

    operatorChoice(theOperator) {
        //lets prevent check if the mainresult is empty so that nothing the function doesn't execute anyother thing
        if (this.mainResult === '' ) return
        //to always make sure that you type somehting in the main result
        if (this.prevResult !== ''){
            this.compute()
        }
this.operation = theOperator
this.prevResult = this.mainResult
this.mainResult = ""
            }
// the compute value will take all t he necessary stuff we need 
//tow methods are calling compute now: if you hit on the operands, you will call the compute method, if ypu also hot on the operands btns, you will call the compute method on line 39
    compute() {
        // so to compute we have already settled that both prev and main result must have a value in our operationChoice method
        let computation
        const prev = parseFloat(this.prevResult)
        const main = parseFloat(this.mainResult)

        if(isNaN(prev) || isNaN(main)) return

        switch(this.operation){
            case '+':
                computation = prev + main
                break
            case '-':
                computation = prev - main
                break
            case '*':
                computation = prev * main
                break
            case '/':
                computation = prev / main
                break
            default:
                return
        }
        //when the equals buttonis clicked, the operand memory is removed..wow!  that is by setting operand to undefined
        this.mainResult = computation
        this.operation = undefined 
        this.prevResult = ''
    }
    //helper function
    getDisplay(number){
    //update the display and make our numbers to have commas

    //lets make the string number work very fine and  not preventing a decimals from inputing

    const stringNum = number.toString()
    const digits = parseFloat(stringNum.split('.')[0])//here we split the string because we want a single digirt before the dot('.') and parse/ convert it to numbers/decimals when necessary depending on the code
    console.log(digits + "thisi sithe diti");
    const decimals = stringNum.split('.')[1]
    //the above code helps to check if there is no digits before the 
    let digitOutput
    //lets make sure that an actual digit was inputed and not a decimal using the isNaN method
    if (isNaN(digits)) {
        digitOutput = ''
        //else if the input entered is an actual didgits, we will want to use the locale string
    }else {
        // we have to make it split with commas here and also make sure that there are no decimals places when it gets convereted to string before this
        digitOutput = digits.toLocaleString('en', {maximumFractionDigits: 0})
    }
    if (decimals != null) {
        console.log(decimals+ 'this is the deci');
        return digitOutput + decimals
    }else  {
        return digitOutput
    }

}
    updatedisplay() {
        this.mainResultBtnText.innerText = this.getDisplay(this.mainResult) 
        if (this.operation != null){
            this.prevResultBtnText.innerText= this.getDisplay(this.prevResult) + " " + this.operation 
        } else {
            this.prevResultBtnText.innerText = ""
        }
     }
    //next is lets look at the different properties our users need to know    
}  

//so the whole point is that..when we click on a button we add an innertext element to it that makes it enter once we type.so thats basically how it works
const numberBtn = document.querySelectorAll('[data-num]')
const operationBtn = document.querySelectorAll('[data-operation]')
const equalsBtn = document.querySelector('[data-equals]')
const deleteBtn = document.querySelector('[data-delete]')
const allClearBtn = document.querySelector('[data-all-clear]')
const prevResultBtnTextElement = document.querySelector('[data-prev-result]')
const mainResultBtnTextElement = document.querySelector('[data-main-result]')

//logical thougths...how do we store all the information that we are about to recieve abi get

//lets start manipulating the inputs
 const calc = new Calculate(prevResultBtnTextElement, mainResultBtnTextElement)
 numberBtn.forEach(button => {  
//lets add an event listener to all of them buttons
    button.addEventListener('click', function() {       
calc.insertNumber(button.innerText);
       // another thing that will also happen anytime we click on a button
    calc.updatedisplay()    
    })
})

operationBtn.forEach(button => {  
    //lets add an event listener to all of them buttons
        button.addEventListener('click', function() {       
    calc.operatorChoice(button.innerText);
           // another thing that will also happen anytime we click on a button
        calc.updatedisplay()    
        })
    })

equalsBtn.addEventListener('click', button =>{
    calc.compute()
    calc.updatedisplay()

})

allClearBtn.addEventListener('click', button =>{
    calc.allClear()
    calc.updatedisplay()
})

deleteBtn.addEventListener('click', button => {
    calc.delete()
    calc.updatedisplay()
})

    