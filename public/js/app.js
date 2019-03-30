console.log('Client side javascript file is loaded!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

//messageOne.textContent = "From me"

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    const location = search.value
    //console.log(location)

    messageOne.textContent = "Loading..." // showing loading screen
    messageTwo.textContent = "" // clearing previous data
   fetch('http://localhost:3000/weather?address='+location).then((response)=>{
    response.json().then((data) =>{
        if(data.error)
        {
            //console.log(data.error)
            messageOne.textContent = data.error //show error message
        }
        else
        {
            //console.log(data.location)
            //console.log(data.forecast)
            //show location and forecast to msg1 & msg2 respt.
            messageOne.textContent = data.location 
            messageTwo.textContent = data.forecast
        }
    })
})

})