vehicles =[
    {
        reg:"BX16BUJ",
        make:"Ford",
        model:"Fiesta",
        registered: "07-10-2019"
    },
    {
        reg:"LC62LHE",
        make:"Citroen",
        model:"C1",
        registered:"25/05/2013"
    }
]

let found = false

function vehicleSearch(){
    console.log("hi")
    let input = document.getElementById('vsearch').value
    //get p tags to be edited with grabbed data
    const makeOutput = document.getElementById('make')
    const modOutput = document.getElementById('model')
    const regOutput = document.getElementById('registered')
    //probably better way to do this had issue due to editing completely different file and didn't want to change back to previous method once fixed
    for(let i = 0; i<vehicles.length ; i++){
        if(input == vehicles[i].reg){
            //get required data and assign to variables to be used for editting inner hmtl
            let make = vehicles[i].make
            let model = vehicles[i].model
            let reg = vehicles[i].registered
            console.log(make, model, reg)
            makeOutput.innerHTML = `Make: ${make}`
            modOutput.innerHTML = `Model: ${model}`
            regOutput.innerHTML = `Registered: ${reg}`
            found = true
        }
    };
    if(found==false){
        console.log("error")
        //basic else case for when incorrect data provided
        let result = document.getElementById('results')
        result.innerHTML = "Reg not found"
        makeOutput.innerHTML = ""
        modOutput.innerHTML = ""
        regOutput.innerHTML = ""
    }

    
}