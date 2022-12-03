/* Shorthands and useful dummy text functions */

const vowel = 'aeeioou';
const con = 'BCCCDDDFGHJKLMMMNNNPQRSSSTTVXZWY'.toLocaleLowerCase();

const random = (x=10)=> Math.floor(Math.random()*(x+1));
const create = (x)=> document.createElement(x);
const $ = x => document.querySelector(x);
const q = x => document.querySelectorAll(x);

const getSyllable = ()=> con[random(con.length-1)]+vowel[random(vowel.length-1)];

const getWord = (x=random(7))=>{
    let word = (x<=3) ? getSyllable()+con[random(con.length-1)]:
    [...Array(Math.floor(x/2))].map( item => 
        (random(10)<5) ? getSyllable() :
        getSyllable()+con[random(con.length-1)]
    ).join('');
    return word;
};
const getName = (n=2) => [...Array(n).fill('')].map(i=>(con[random(con.length-1)].toUpperCase() + getWord().substring(1))).join(' ');

const getParagraph = (x) => [...Array(x)].map(item => getWord()).join(' ');

/* Functional main page script starts here */

const library = [];
const form = $('.form.container');

function Book(title,author,pages = 0,status = false){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.info = ()=> [this.title,this.author,this.pages,((this.status)?'read':'unread')];
}

function toggleBookStatus(i){
    i = library.findIndex(e=>e.index===i);
    library[i].status = !library[i].status;
    displayBooks();
    return "Book status toggled";
}

function addBookToLibrary(book){
    book.index = library.length;
    library[book.index] = book;
}

function removeBook(i){
    library.splice(library.findIndex(e=>e.index===i),1);
    displayBooks();
}

function displayBooks(){
    let div = $('table.books');
    div.innerHTML = '';
    let list = `<tr><th></th><th>Book Title<th>Author</th><th>Pages</th><th>Status</th><th></th><th></th>`;
    for(let i = 0;i<library.length;i++){
        list += `<tr>
                    <td>${(i+1)}.</td>
                    <td>${library[i].info().join('</td><td>')}</td>
                    <td><img onclick="removeBook(${library[i].index})" src="images/book-remove.svg"></td>
                    <td><img onclick="toggleBookStatus(${library[i].index})" src="images/book-${!library[i].status?'read':'unread'}.svg"></td>
                </tr>`;
    }
    div.innerHTML = list;
    return "Book List Generated";
}
$('.book-addition').addEventListener('submit',(e)=>{
    let store = e.target;
    let newBook = new Book(store.btitle.value,store.author.value,store.pages.value,(store.status.value === 'true')?true:false);
    addBookToLibrary(newBook);
    hideForm();
    displayBooks();
    e.preventDefault();
    e.target.reset();
})

const showForm = ()=> {
    form.style.display = 'grid';
    setTimeout(()=>form.style.opacity = 1,0)
};
const hideForm = ()=> {
    form.style.opacity = 0;
    setTimeout(()=>form.style.display = 'none',500)
};

$('body').addEventListener('keydown',(e)=>{(e.key === 'Escape')?hideForm():false});

$('div.form.container').addEventListener('click',(e)=>{e.currentTarget === e.target ? hideForm(): false});

const createBooks = x => {for(let i = 0;i<x;i++){
    addBookToLibrary(new Book(getName(random(3)+1),getName(2),random(555)+45,((random(1)===0)?true:false)))
}};

createBooks(random(7)+3);
displayBooks();

/* Style manuplation */

const root = $(':root');
const colorPage = (c = random(255))=>{
    root.style.setProperty('--main-color',`hsl(${c},45%,80%)`);
    root.style.setProperty('--main-background',`hsl(${c},45%,60%)`);
}
colorPage();