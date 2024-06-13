const BaseURL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const btn = document.querySelector(".result");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

const dropdownS = document.querySelectorAll(".dropdown select");
for(let select of dropdownS){
for (code in countryList){
    // console.log(code,countryList[code]);
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;
    if(select.name==="from" && code==="INR"){
        newOption.selected = "selected";
    }
    else if(select.name==="to" && code==="USD"){
        newOption.selected = "selected";
    }
    select.append(newOption);
}
select.addEventListener("change",(evt) =>{
    updateflag(evt.target);
});
}

const updateflag = (element) =>{
    let currcode = element.value;
    let countryCode = countryList[currcode];
    countryCode = countryCode.toUpperCase();
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let cimg = element.parentElement.querySelector("img");
    cimg.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amt = document.querySelector(".amount input");
    let amtvalue = amt.value;
    if(amtvalue === "" || amtvalue<0){
        amtvalue = 1;
        amt.value = "1";
    }
    const newUrl = `${BaseURL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(newUrl);
    let data = await response.json();
    let findd = data[fromCurr.value.toLowerCase()];
    let rate = findd[toCurr.value.toLowerCase()];
    let finalamt = amtvalue*rate;
    msg.innerText = `${amtvalue} ${fromCurr.value} = ${finalamt} ${toCurr.value}`;
});