
let url = "https://crudcrud.com/api/8bfa18be1a4c4c1daad27626e09ff537"
var form = document.querySelector("#form")
var inputs = document.querySelectorAll('input')
var listExpenses = document.querySelector('#allList')
var amount = inputs[0]
var description = inputs[1]
var category = document.querySelector('select')
let userEditId = null

window.addEventListener("DOMContentLoaded",load)
async function load(){
  response = await axios.get(url+"/expenses")
    for(let item=0;item<response.data.length;item++){
      addtoList(response.data[item])
    }
  
}

form.addEventListener('submit', (e)=>{
    e.preventDefault()
    const obj = {
        amount : amount.value,
        description : description.value,
        category : category.value,
      }
      if(userEditId === null){
        axios
        .post(url+"/expenses",obj)
        .then((response) => {addtoList(response.data)
          console.log(response.data._id)})
      }
      else{
        axios
        .put(`${url}/expenses/${userEditId}`,obj)
        // addtoList(obj)
        .then(addtoList({...obj,_id:userEditId}))
        userEditId = null
      }

})

function addtoList(obj){
    amount.value = ""
    description.value = ""
    category.value = ""
    let listId =obj.amount+obj.category
    const list = `<li id = ${listId}> $${obj.amount} - ${obj.description} - ${obj.category} - 
    <button onclick="edit('${obj.amount}','${obj.description}','${obj.category}','${obj._id}')" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> 
    <button onclick="deleted('${obj.amount}','${obj._id}','${obj.category}')" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`
    listExpenses.innerHTML =listExpenses.innerHTML + list
  }

  function deleted(amt,id,category){
    axios.delete(`${url}/expenses/${id}`)
    removeItemFromList(amt,category)
  }

  function removeItemFromList(amount,category){
    let search = amount+category 
    let childNodetobedeleted = document.getElementById(search)
    if (childNodetobedeleted){
      listExpenses.removeChild(childNodetobedeleted)
    }
  }

  function edit(amt,des,category,id){
    amount.value = amt
    description.value = des
    category.value = category
    removeItemFromList(amt,category)
    userEditId = id
    console.log(userEditId)
  }

