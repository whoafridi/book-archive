const bookDb= () => {
    const searchField = document.getElementById("book-search");
    const searchText = searchField.value;
    searchField.value = '';
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => displayBook(data));
}
const displayBook = books => {
    const t = books.docs;
    //console.log(books.docs[0])
    t.forEach(book => {
        console.log(book.author_name);

    })
}