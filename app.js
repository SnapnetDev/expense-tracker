let expenseList = [];
let selectedKey = -1;
// item, price,date_created


function addItem({item,price,date_created}){
 expenseList.push({item,price,date_created});
}

function removeItem(id){
  if (confirm('Do you want to remove this item?')){
    expenseList = expenseList.filter((item,key)=>{
        if (key != id){
          return item;
        }
    });
    renderExpenseList();   
  }   
}

function selectItem(id){
   selectedKey = id;
   let data = getRow(id)[0];
   setInput(data);
   renderButtonBehaviour();
}

function renderButtonBehaviour(){
   let $button = document.querySelector('#submit');
    if (selectedKey == -1){
      $button.innerHTML = 'Create'; 
      return;
    } 
    $button.innerHTML = 'Update'; 

}

function getRow($key){
    return expenseList.filter((item,key)=>{
      return key == $key;
    });
}

function editItem(key){
  let {item,price,date_created} = getInput();
  expenseList[key] = {item,price,date_created};
  renderExpenseList();
  selectedKey = -1;
  clearInput();
  renderButtonBehaviour();
}

function fetchItems(){
  return expenseList;
}

function searchItem(value){
    let expenseList_ = expenseList.filter(({item})=>{
        console.log(item);
       return item.toLowerCase().search(value) != -1;
    });
    console.log(expenseList_);
    if (expenseList_.length){
        renderExpenseListInSearchMode(expenseList_);
        return;
    }
    renderExpenseList();
}

function searchItemByDate(value){
    let expenseList_ = expenseList.filter(({date_created})=>{
        // console.log(item);
       return date_created == value;
    });
    console.log(expenseList_);
    if (expenseList_.length){
        renderExpenseListInSearchMode(expenseList_);
        return;
    }
    renderExpenseList();
}


function saveItemsToStore(){
  localStorage.setItem('store',JSON.stringify(expenseList));
//   console.log(localStorage.getItem('store'));
}

function resetStore(){
    localStorage.setItem('store','[]');
}

function pullFromStore(){
   let list = localStorage.getItem('store');
   if (list != null){
      expenseList = JSON.parse(list);
   }
}


function getInput(){
    let item = document.querySelector('#item').value; 
    let price = document.querySelector('#price').value;
    let date_created = document.querySelector('#date_created').value;
   return {item,price,date_created};
}

function clearInput(){
    document.querySelector('#item').value = ''; 
    document.querySelector('#price').value = '';
    document.querySelector('#date_created').value = '';
    document.querySelector('#item').focus();
}

function setInput({item,price,date_created}){
    document.querySelector('#item').value = item; 
    document.querySelector('#price').value = price;
    document.querySelector('#date_created').value = date_created;
}



function addExpense(){
    let {item,price,date_created} = getInput();
    addItem({item,price,date_created});
    renderExpenseList();
    clearInput();
}

function renderExpenseList(){
    
    let $expenseList = document.querySelector('#expense-list');
    let acc = [];
    acc = expenseList.map(({item,price,date_created},key)=>{
        return `<tr>
        <td>
            ${item}
        </td>
        <td>
            ${price}
        </td>
        <td>
            ${date_created}
        </td>
        <td>
          <button onclick="selectItem(${key})">Edit</button>
          <button onclick="removeItem(${key})">Remove</button>
        </td>
    </tr> `;
    });
    $expenseList.innerHTML = acc.join('');
    saveItemsToStore();
}

function renderExpenseListInSearchMode(list){
    let $expenseList = document.querySelector('#expense-list');
    let acc = [];
    acc = list.map(({item,price,date_created},key)=>{
        return `<tr>
        <td>
            ${item}
        </td>
        <td>
            ${price}
        </td>
        <td>
            ${date_created}
        </td>
        <td>
          <button onclick="selectItem(${key})">Edit</button>
          <button onclick="removeItem(${key})">Remove</button>
        </td>
    </tr> `;
    });
    $expenseList.innerHTML = acc.join('');
}


function handleExpenseCreation(){
    document.querySelector('#submit').addEventListener('click',()=>{
        if (selectedKey == -1){
            addExpense();
            return;
        }
        editItem(selectedKey);
    });
}

function handleSearch(){
    document.querySelector('#search').addEventListener('keyup',(e)=>{
        let value = e.target.value;
        searchItem(value);
        // alert('pressed' + value);

    });
    document.querySelector('#search-date').addEventListener('change',(e)=>{
        let value = e.target.value;
        searchItemByDate(value);
        // alert('pressed' + value);

    });
    //searchItemByDate
}




pullFromStore(); 
handleExpenseCreation();
handleSearch();
renderExpenseList();
