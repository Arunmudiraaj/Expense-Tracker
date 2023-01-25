


var addBtn = document.querySelector("#add")
var inputs = document.querySelectorAll('input')
var listExpenses = document.querySelector('#allList')
var amount = inputs[0]
var description = inputs[1]
var category = document.querySelector('select')
let userEditId = null
addBtn.addEventListener('click',addTask)
update()
async function addTask(){
    if(amount.value===""||description.value===""){
        alert("Enter valid amount and description details in respective fields")
        return
    } 
    const expense = {
        "amount" : amount.value,
        "description" : description.value,
        "category" : category.value
    }
    if (userEditId!=null){
        res = await axios.put('https://crudcrud.com/api/f85ea4b0724a43c0afea8b7f323fd93f/expenses/'+userEditId,{data : expense})
        userEditId = null
            console.log(res)
            update()
    }
    else{
        axios.post('https://crudcrud.com/api/f85ea4b0724a43c0afea8b7f323fd93f/expenses',{data : expense})
    .then(res=>{
        console.log(res)
        
        update()
    })
    .catch(err=>{console.log(err)})
    }
    
    
}
function update(){
    // if (localStorage.getItem('expenses')===null){
    //     return
    // }
    
    axios.get("https://crudcrud.com/api/f85ea4b0724a43c0afea8b7f323fd93f/expenses")
    .then(res=>{
        listExpenses.innerHTML = ""
        arr = res.data
        arr.forEach((element,index) => {
            
            //strg+= `<li> $${element.data.amount} - ${element.data.description} - ${element.data.category} - <button onclick="edit(String(element._id))" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> <button onclick="deleted(${index})" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`
            const child = document.createElement('li')
            child.textContent = `$${element.data.amount} - ${element.data.description} - ${element.data.category} - `
            const deletebtn = document.createElement('input')
            deletebtn.type = 'button'
            deletebtn.value = 'delete'
            deletebtn.classList.add('bg-red-400', 'mx-1', 'active:opacity-75', 'border-black', 'border', 'rounded-md', 'px-2', 'hover:cursor-pointer')
            deletebtn.onclick = ()=>{
                console.log(element._id)
                axios.delete("https://crudcrud.com/api/f85ea4b0724a43c0afea8b7f323fd93f/expenses/"+element._id)
                .then((res)=>{
                    console.log(res)
                    update()
                })
                .catch((err)=>{
                    console.log(err)

                })
            }
            
            

            const editbtn = document.createElement('input')
            editbtn.type = 'button'
            editbtn.value = 'edit'
            editbtn.classList.add('bg-yellow-300', 'mx-1', 'active:opacity-75', 'border-black', 'border', 'rounded-md', 'px-2', 'hover:cursor-pointer')
            editbtn.onclick = ()=>{
                console.log(element._id)
                  amount.value = element.data.amount
                  description.value = element.data.description
                  category.value = element.data.category
                  userEditId = element._id
                  listExpenses.removeChild(child)
                
            }
            child.appendChild(editbtn)
            child.appendChild(deletebtn)
            listExpenses.appendChild(child)
        });
        
    })
    // jsonArray = JSON.parse(strArray)
    // jsonArray.forEach((element,index) => {
    //    strg+= `<li> $${element[0]} - ${element[1]} - ${element[2]} - <button onclick="edit(${index})" class="bg-yellow-300 active:opacity-75 border-black border rounded-md px-2">Edit</button> <button onclick="deleted(${index})" class="bg-red-400 active:opacity-75 border-black border rounded-md px-2">Delete</button> </li>`
    // });
    // listExpenses.innerHTML = strg


}
// function deleted(id){
//     console.log("in delete");
//     // strArray = localStorage.getItem('expenses')
//     // jsonArray = JSON.parse(strArray)
//     // jsonArray.splice(index, 1)
//     // localStorage.setItem('expenses',JSON.stringify(jsonArray))
//     // update()
//     axios.delete("https://crudcrud.com/api/fad0845aee04436fa8699151c04c8f8f/expenses/"+id)
//     .then(res=>{ 
//         console.log(res)
//         update()
//      })
//     .catch(err=>{console.log(err)})
// }
// function edit(id){
//     console.log("in edit");

//     // strArray = localStorage.getItem('expenses')
//     // jsonArray = JSON.parse(strArray)
//     // element = jsonArray[index]
//     // amount.value = element[0]
//     // description.value = element[1]
//     // category.value = element[2]
//     // deleted(index)
//     const expense = {
//         "amount" : amount.value,
//         "description" : description.value,
//         "category" : category.value
//     }
//     axios.put("https://crudcrud.com/api/fad0845aee04436fa8699151c04c8f8f/expenses/"+id,{data : expense})
//     .then(res=>{ console.log(res) })
//     .catch(err=>{console.log(err)})
// }