const resultNode = document.querySelector('.output');
const btnNode = document.querySelector('.button');

window.onload = function () {
    if (localStorage.getItem('cardsStr')!==null) {
        resultNode.innerHTML = localStorage.getItem('cardsStr');
    }
}

function useRequest(value1, value2) {
    fetch(`https://picsum.photos/v2/list?page=${value1}&limit=${value2}`)
        .then(function(response) {
           response.json().then(function  (data) {
                    let cards = '';

              data.forEach(item => {
                const cardBlock = `
            <div class="card">
                <img
                    src="${item.download_url}"
                    class="card-image"
                    alt="alt"/>
                    <p>${item.author}</p>
            </div>
                `;
                cards = cards + cardBlock;
            });
            resultNode.innerHTML = cards;
            localStorage.setItem('cardsStr', cards)
              })
                     })
}

btnNode.addEventListener('click', function () {
   const value1 = document.querySelector('input[id="page"]').value;
   const value2 = document.querySelector('input[id="limit"]').value;
     if (value1 > 0 && value1 < 11 && value2 > 0 && value2 < 11) {
         useRequest(value1, value2)
     }
     else if ((value1 < 1 || value1 > 10) && (value2 < 1 || value2 > 10)) {
         resultNode.innerHTML = 'Номер страницы и лимит вне диапазона от 1 до 10'
     }
        else if (value1 < 1 || value1 > 10) {
            resultNode.innerHTML = 'Номер страницы вне диапазона от 1 до 10';
     }
        else if (value2 < 1 || value2 >10) {
            resultNode.innerHTML = 'Лимит вне диапазона от 1 до 10'
     }

})