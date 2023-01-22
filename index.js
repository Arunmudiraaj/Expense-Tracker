


var addBtn = document.querySelector("#add")
var inputs = document.querySelectorAll('input')
var listExpenses = document.querySelector('#allList')
var amount = inputs[0]
var description = inputs[1]
var category = document.querySelector('select')
addBtn.addEventListener('click',addTask)
update()
function addTask(){
    if(amount.value===""||description.value===""){
        alert("Enter valid amount and description details in respective fields")
        return
    } 
    // if (localStorage.getItem('expenses')===null){
    //     var jsonArray = []
    //     jsonArray.push([amount.value,description.value,category.value])
    //     localStorage.setItem('expenses',JSON.stringify(jsonArray))
    // }
    // else{
    //     var strArray = localStorage.getItem('expenses')
    //     jsonArray = JSON.parse(strArray)
    //     jsonArray.push([amount.value,description.value,category.value])
    //     localStorage.setItem('expenses',JSON.stringify(jsonArray))
    // }
    // update()
    const expense = {
        "amount" : amount.value,
        "description" : description.value,
        "category" : category.value
    }
    axios.post('https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses',{data : expense})
    .then(res=>{
        console.log(res)
        update()
    })
    .catch(err=>{confirm.log(err)})
    
}
function update(){
    // if (localStorage.getItem('expenses')===null){
    //     return
    // }
    strg = ""
    axios.get("https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses")
    .then(res=>{
        arr = res.data
        arr.forEach((element,index) => {
            strg+= `<li> $${element.data.amount} - ${element.data.description} - ${element.data.category} - <button onclick="edit(${index})" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> <button onclick="deleted(${index})" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`
        });
        listExpenses.innerHTML = strg
    })
    // jsonArray = JSON.parse(strArray)
    // jsonArray.forEach((element,index) => {
    //    strg+= `<li> $${element[0]} - ${element[1]} - ${element[2]} - <button onclick="edit(${index})" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> <button onclick="deleted(${index})" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`
    // });
    // listExpenses.innerHTML = strg


}
function deleted(index){
    // strArray = localStorage.getItem('expenses')
    // jsonArray = JSON.parse(strArray)
    // jsonArray.splice(index, 1)
    // localStorage.setItem('expenses',JSON.stringify(jsonArray))
    // update()
    axios.get("https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses")
    .then(res=>{
        element = res.data[index]
     
        axios.delete("https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses/"+element._id)
        .then(()=>{ 
            update()
    })
        .catch((err)=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
}
function edit(index){
    // strArray = localStorage.getItem('expenses')
    // jsonArray = JSON.parse(strArray)
    // element = jsonArray[index]
    // amount.value = element[0]
    // description.value = element[1]
    // category.value = element[2]
    // deleted(index)

    axios.get("https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses")
    .then(res=>{
        element = res.data[index]
        amount.value = element.data.amount
        description.value = element.data.description
        category.value = element.data.category
        axios.delete("https://crudcrud.com/api/5bbf233e1fe74d8a8357c4183f9406c8/expenses/"+element._id)
        .then(()=>{ 
            update()
    })
        .catch((err)=>{console.log(err)})
    })
    .catch(err=>{console.log(err)})
}