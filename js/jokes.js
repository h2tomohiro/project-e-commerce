const jokesRes = document.querySelector('#jokesRes');
const jokeBtn = document.querySelector('#jokesBtn');

const getDataJokes = async () => {
    jokesRes.innerHTML = '';
    const res = await axios.get('https://icanhazdadjoke.com', {
        headers: { 'Accept': 'application/json' }
    });
    const joke = res.data;
    const p = document.createElement('p');
    p.innerHTML = `${joke.joke}`;
    jokesRes.appendChild(p);

    console.log(jokesRes);
};

jokeBtn.addEventListener('click', e => {
    e.preventDefault();
    console.log('button click');
    getDataJokes();
});


function filterItems() {
    const filterBtn = document.querySelectorAll('.filterBtn');
    

    filterBtn.forEach(function (filter) {
        filter.addEventListener('click', function(event){   
            console.log(event.target);
            let bodyItems = document.querySelectorAll('.filtrBody');
            let faceItems = document.querySelectorAll('.filtrFace');
            let handItems = document.querySelectorAll('.filtrHand');
            
            bodyItems.forEach(function (addClName){
                addClName.classList.add('hide');
                console.log('console inside', bodyItems);
            });
            faceItems.forEach(function (addClName){
                addClName.classList.add('hide');
            });
            handItems.forEach(function(addClName){
                addClName.classList.add('hide');
            });

            
            if (event.target.classList.contains('btnBody')) {                
                bodyItems.forEach(function (remClName){
                    remClName.classList.remove('hide');
                   // console.log('console rem inside', bodyItems);
                });    
               

            } else if (event.target.classList.contains('btnFace')) {       
                faceItems.forEach(function (remClName){
                    remClName.classList.remove('hide');    
                });   
                    
                
            } else if (event.target.classList.contains('btnHands')) {       
                handItems.forEach(function (remClName){
                    remClName.classList.remove('hide');
                });   
            } else if (event.target.classList.contains('btnAll')) {
                bodyItems.forEach(function (remClName){
                    remClName.classList.remove('hide');
                    console.log('console rem inside', bodyItems);
                });
                faceItems.forEach(function (remClName){
                    remClName.classList.remove('hide');    
                }); 
                handItems.forEach(function (remClName){
                    remClName.classList.remove('hide');
                });       
                
            }
        });
    })

}

filterItems();

