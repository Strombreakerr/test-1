const selected = document.querySelector(".selected");
const optionsContainer = document.querySelector(".options-container");
const optionsList = document.querySelectorAll(".option");
selected.addEventListener("click", () => { optionsContainer.classList.toggle("active"); });
optionsList.forEach( o => {
        o.addEventListener("click", () => {
            selected.innerHTML = o.querySelector("label").innerHTML;
            optionsContainer.classList.remove("active");
            if(selected.innerHTML == "Incident Management")
                {
                    let myScript = document.createElement("script");
                    myScript.setAttribute("src", "IM/IM_script_main.js");
                    document.body.appendChild(myScript);
                    document.getElementById("dont-show-until-requested").style.visibility="visible";
                }
            if(selected.innerHTML == "Risk Management")
                {
                    let myScript = document.createElement("script");
                    myScript.setAttribute("src", "RM/RM_script_main.js");
                    document.body.appendChild(myScript);
                    document.getElementById("dont-show-until-requested").style.visibility="visible";
                }
            if(selected.innerHTML == "Vendor Risk Management")
                {
                    let myScript = document.createElement("script");
                    myScript.setAttribute("src", "VRM/VRM_script_main.js");
                    document.body.appendChild(myScript);
                    document.getElementById("dont-show-until-requested").style.visibility="visible";
                }
        });
});