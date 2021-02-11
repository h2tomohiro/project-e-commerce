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
