window.onload = function() {
    form = document.getElementById("getResult");
    input = document.getElementById("word")
    results = document.querySelector("#results")
    title = document.querySelector("#title")
    uls = document.querySelector("#def")

    form.addEventListener('submit', (e) => {
        e.preventDefault();


        key = input.value
        
        process1(key)
    });
};

const process1 = n => {
    fetch(`http://localhost:5000/api/v1/words?word=${n}`)
            .then(data => data.json())
            .then(final =>  {
                uls.innerHTML = "";
                if(final['word']) {
                    title.innerText = n;
                    // title.innerText = escape(n);
                    // console.log(final['word'])
                    final['word'].map((val, i) => {
                        uls.innerHTML += `<li><p>${i + 1}. </p> &nbsp; <p> ${val}</p></li>`
                    })
                    input.value = ""
                } else if(final['diff']) {
                    title.innerHTML = `Did you mean <a href="#" onclick="process1('${final.diff}')">${final.diff}</a>?`
                } else if(final['error']) {
                    title.innerText = final.error;
                } else {
                    console.log("Sorry, an error occurred :(")
                }
            })
};