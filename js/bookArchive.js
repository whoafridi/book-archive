// common variable added for accessing to everywhere //
const searchResult = document.getElementById("search-result");
const result = document.getElementById('result');
const searchField = document.getElementById("book-search");

// book api initiate
const bookApi= () => {
    const searchText = searchField.value;
    if (searchField.value == ''){
        alert("Please add a valid name");
    }
    else{
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    fetch(url)
    .then(res => res.json())
    .then(data => {
        if (data.numFound === 0) {
            alert("Didn't find what you were looking for?");
            result.innerHTML = `<h6 class="text-muted fw-bold">Found ${data.docs.length} Results For "${data.q}"</h6>`
            searchResult.textContent = '';
        } else {
            displayBook(data);
            countResult(data);
        }
    });
    searchField.value = '';
    }
};

// display the total book result
const countResult = (data) => {
    result.innerHTML = `<h6 class="text-muted fw-bold">Showing ${data.docs.length} Results For "${data.q}"</h6>`
};

// display all books in html template
const displayBook = data => {
    searchResult.textContent = '';
    data.docs.forEach(item => {
        let bookSrc = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`
        if (item.cover_i === undefined) {
            bookSrc = `https://png.pngtree.com/thumb_back/fw800/back_pic/04/53/12/2658610613de2a7.jpg`
            
            }
        // check whether author name found or not
        let authorSrc = item.author_name
        if ( authorSrc === undefined){
            authorSrc = `Not found`;
            }
        else{
            authorSrc;
            }
        // check publisher found or not
        let publisherSrc = item.publisher
        if ( publisherSrc === undefined){
            publisherSrc = `Not found`;
            }
        else{
            publisherSrc;
            }
        // check publish year found or not
        let publishYearSrc = item.first_publish_year
        if ( publishYearSrc === undefined){
            publishYearSrc = `Not found`;
            }
        else{
            publishYearSrc;
            }
        // adding details in html template using dom
        const resultDiv = document.createElement('div');
        resultDiv.classList.add('col');
            // adding content
        resultDiv.innerHTML = `
            <div class="card h-80">
                <img src=${bookSrc} class="card-img-top img-fluid rounded img-fluid " alt="{item.title}">
                <div class="card-body">
                  <h5 class="card-title">${item.title}</h5>
                  <h6 class="text-center bg-danger text-white w-auto py-2">By ${authorSrc}</h6>
                <p class="text-center">Published By ${publisherSrc} in ${publishYearSrc} </p>
                </div>
            </div>
            `
        searchResult.appendChild(resultDiv); 
            });
};