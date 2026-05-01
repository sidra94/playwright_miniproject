const{test,expect}=require("@playwright/test")
const {ToDO_Page } = require( "../pages/ToDo_Page")

//Test Case:1
test("it should navigate to url",async({page})=>{

const a=new ToDO_Page(page)
await a.url_navigation()


})
//Test Case 2: Adding items in a list. 
test("it should add items to do list",async({page})=>{

const a=new ToDO_Page(page)
await a.url_navigation()
await a.add_list([
    "Test Cases Execution","Buy Groceries","Gym Session","Coffee"])


})
//Test Case 3: Marking added items as completed.

test("it should complete added items",async({page})=>{

const a=new ToDO_Page(page)
await a.url_navigation()
await a.add_list([
    "Test Cases Execution","Buy Groceries","Gym Session","Coffee"])
await a.mark_completed()

})
//Test Case 4: Clearing completed items
test("it should cleared completed items",async({page})=>{

const a=new ToDO_Page(page)
await a.url_navigation()
await a.add_list([
    "Test Cases Execution","Buy Groceries","Gym Session","Coffee"])
await a.mark_completed()
await a.clear_completed()

})

