const inputField = document.querySelector('.input-field input');
const addItemBtn = document.querySelector('.add-item-btn');
const listItemHolder = document.querySelector('.list-items-holder');
const holderFooter = document.querySelector('.holder-footer');
const itemsLeft = document.querySelector('.items-left');

const activeList = document.querySelector('.active-todo');
const completedList = document.querySelector('.completed-todo');
const allList = document.querySelector('.all-todo');
const clearCompleted = document.querySelector('.clear-completed');



let counter = 0;

//Functions
function singleItemCounter(){
    if(counter ===1){
       itemsLeft.innerText = `${counter} item left`; 
    }
}
function reducedItemCount(){
    counter--;
    itemsLeft.innerText = `${counter} items left`;
    singleItemCounter();
}

addItemBtn.addEventListener('click', () => {
    if(inputField.value === ''){
        return
    }
    let listItem = document.createElement('li');
    let clickableCircle = document.createElement('div');
    let listParagraph = document.createElement('p');
    let closeBtn = document.createElement('span');
    listParagraph.innerHTML = inputField.value;
    closeBtn.innerText = 'x';

    listItem.setAttribute('draggable', 'true');

    listItem.classList.add('list-item');
    clickableCircle.classList.add('clickable-circle');
    listParagraph.classList.add('list-paragraph');
    closeBtn.classList.add('close-btn');

    listItem.appendChild(clickableCircle);
    listItem.appendChild(listParagraph);
    listItem.appendChild(closeBtn);
    listItemHolder.insertBefore(listItem, holderFooter);

    inputField.value = '';
    if(completedList.classList.contains('active-tab')){
        listItem.style.display = 'none';
        return;
    }
    counter++;
    itemsLeft.innerText = `${counter} items left`;
    singleItemCounter();

});


listItemHolder.addEventListener('click', (e) => {

    if(e.target.classList.contains('close-btn')){
       listItemHolder.removeChild(e.target.parentElement);
        reducedItemCount(); 
    }

    if(e.target.classList.contains('clickable-circle')){
        
        //Functions
        function textDecorationAndOpacity(textDeco, opacity){
            e.target.nextElementSibling.style.textDecoration = textDeco;
            e.target.nextElementSibling.style.opacity = opacity;
        }
        function reducedItemCountAndDisplayNone(){
            e.target.parentElement.style.display = 'none';
            reducedItemCount();
        }

        if(e.target.classList.contains('check-mark')){
            textDecorationAndOpacity('none', 1);   
        }
        else{
            textDecorationAndOpacity('line-through', 0.3);
        }
        e.target.classList.toggle('check-mark');
        e.target.parentElement.classList.toggle('inactive');
        
        if(completedList.classList.contains('active-tab')){
            reducedItemCountAndDisplayNone();
        }
        if(activeList.classList.contains('active-tab')){
            reducedItemCountAndDisplayNone();
        }

    }
});


document.addEventListener('click', (e) => {
    let listItems = document.querySelectorAll('.list-item');
    let newCounterLength = [];

    //Local Functions
    function displayFlexAndIncrementCounter(item){
        item.style.display = 'flex';
        newCounterLength.push(item);
    }

    function resetCounter(){
        counter = newCounterLength.length;
        itemsLeft.innerText = `${counter} items left`;
        singleItemCounter();
    }

    if(e.target.classList.contains('active-todo')){
        listItems.forEach((item) => {
            if(item.classList.contains('inactive')){
                item.style.display = 'none';   
            }
            else{
                displayFlexAndIncrementCounter(item);
            }
        });
        resetCounter();
        completedList.classList.remove('active-tab');
        allList.classList.remove('active-tab');
        activeList.classList.add('active-tab');
    }


    if(e.target.classList.contains('completed-todo')){
        listItems.forEach((item) => {
            if(!item.classList.contains('inactive')){
                item.style.display = 'none';
            }
            else{
                displayFlexAndIncrementCounter(item);
            }
        });
        resetCounter();
        activeList.classList.remove('active-tab');
        allList.classList.remove('active-tab');
        completedList.classList.add('active-tab');
    }


    if(e.target.classList.contains('all-todo')){
      listItems.forEach((item) => {
            displayFlexAndIncrementCounter(item);
        });
        resetCounter();
        activeList.classList.remove('active-tab');
        allList.classList.add('active-tab');
        completedList.classList.remove('active-tab');  
    }

    if(e.target.classList.contains('clear-completed')){
        listItems.forEach((item) => {
            if(item.classList.contains('inactive')){
                item.parentElement.removeChild(item);
                if(activeList.classList.contains('active-tab')){
                    return
                }
                reducedItemCount();
            }
        })
    }
});

const listState = document.querySelector('.state');
let mediaQuery = window.matchMedia('(max-width: 768px)');
function changeView(){
    if(mediaQuery.matches){
        listItemHolder.insertAdjacentElement("afterend", listState);
        listState.style.padding = 'var(--p) 0';
    }
    else{
        holderFooter.insertBefore(listState, clearCompleted);
        listState.style.padding = '0';
    }
}
changeView();

mediaQuery.addListener(changeView);


// let dragables = listItemHolder.querySelectorAll('.li');
// dragables.forEach((dragable) => {
//     dragable.addEventListener('drag', (e) => {
//         console.log('yeah');
//     });
//     dragable.addEventListener('dragEnter', (e) => {
//         e.preventDefault();
//     });
//     dragable.addEventListener('dragOver', (e) => {
//         e.preventDefault();
//         let position = listItemHolder.indexOf(dragable);
//         return position;
//     });
// })