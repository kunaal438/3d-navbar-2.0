const toggleBtn = document.querySelector('.toggle-btn');
const ul = document.querySelector('nav .link');
const links = [...document.querySelectorAll('li')];
let pages = [
    document.querySelector('.page-one'),
    document.querySelector('.page-two'),
    document.querySelector('.page-three')
]; // storing all pages in an array

let classArr = ['front', 'left', 'down']; // storing our styling classes in an array

toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    ul.classList.toggle('active');
    
    pages.forEach((item, index) => { // looping through pages
        item.classList.toggle('skew'); // toggling skew class
        if(!item.className.includes('skew')){ // checking whether page has class skew or not
            // if page classname not include skew thats mean we are removing 3d prespective in that case we have to remove our extra classes which we use to create transition
            
            if(item.className.includes('front')){ //checking for the class front
                item.classList.remove('front'); // if we find front class we are removing it and setting is zindex to the highest as we have only 3 pages so we are setting here 3 repeat this process for other two classes as well (left, down)
                item.style.zIndex = 3;
            } else if(item.className.includes('left')){
                item.classList.remove('left');
                item.style.zIndex = 2;
            } else if(item.className.includes('down')){
                item.classList.remove('down');
                item.style.zIndex = 1;
            }
        } else{ // now if page has skew class which mean user is entering in 3d prespective so in that case we are now adding our extra classes
            
            if(item.style.zIndex == ''){ //checking whether we have set any zIndex to the page or not
                item.classList.add(classArr[index]);
            } else{
                item.classList.add(classArr[3 - item.style.zIndex]);
            }

            // we are doing thischecking because we want to make sure that after removing our extra (supportive) classes we always get our desired page on top thats why we are setting zIndex for each page
        }
    })
})

const slider = (nxtPage) => {
    //  we use for loop to change the classes in this case we have only 3 pages thats why we are looping only 3 times
    
    for(let i = 0; i < 3; i++){
        // now again we have to just make our desired page on top in 3d vies so if we are done with that then we dont want this loop to do anythig that is why we are checking a condition here

        if(!pages[nxtPage].className.includes('front')){ 
            pages.forEach(item => { // now we are just looping through pages and just remove/add classes
                if(item.className.includes('front')){
                    item.classList.remove('front');
                    item.classList.add('down');
                } else if(item.className.includes('left')){
                    item.classList.remove('left');
                    item.classList.add('front');
                } else if(item.className.includes('down')){
                    item.classList.remove('down');
                    item.classList.add('left');
                }
            })
        }
    }
}

// adding click event to the link
links.forEach((item, i) => {
    item.addEventListener('click', () => {
        let nxtPage = i;
        slider(nxtPage);
    })
})