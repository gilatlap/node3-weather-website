
console.log('js file loaded')

//puzzle.mead.io/puzzle


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const message1 = document.querySelector('#message-1')
const message2 = document.querySelector('#message-2')

weatherForm.addEventListener('submit',(e)=>{
    //prevent default behavior from reload the page after cliccking search
    e.preventDefault()
    //the value entered in the search
    const location = search.value
    message1.textContent='Loading...'
    message2.textContent=''
    const url = 'http://localhost:3000/weather?address='+location

    //this is client side js to fetch data from a url
    fetch(url).then((response)=>{
        
        response.json().then((data)=>{
            if(data.error){
                message1.textContent = data.error
            }
            else{
                message1.textContent=data.location
                message2.textContent=data.forecast
            }
            
        })
    })
})