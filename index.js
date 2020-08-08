console.log('postman clone app');

function getElementFromString(string) {
    let div = document.createElement('div')
    div.innerHTML = string
    return div.firstElementChild
}

let parametersBox = document.getElementById('parametersBox')
parametersBox.style.display = 'none'

// If the user clicks on params box, hide the json box

let paramsRadio = document.getElementById('paramsRadio')
paramsRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'none'
    document.getElementById('parametersBox').style.display = 'block'
})

// If the user clicks on json box, hide the params box

let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    document.getElementById('requestJsonBox').style.display = 'block';
    document.getElementById('parametersBox').style.display = 'none';
})

let addedParamCount = 0

//if the user click on plus button add more paramenters
let addParam = document.getElementById('addParam')
addParam.addEventListener('click', () => {
    let params = document.getElementById('params')
    let string = `<div class="form-row my-2">
                    <label for="url" class="col-sm-2 col-form-label">Parameter ${addedParamCount + 2}</label>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterKey${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Key">
                    </div>
                    <div class="col-md-4">
                        <input type="text" class="form-control" id="parameterValue${addedParamCount + 2}" placeholder="Enter Parameter ${addedParamCount + 2} Value">
                    </div>
                    <button class="btn btn-primary deleteParam"> - </button>
                    </div>`;
    let paramElement=getElementFromString(string)
    params.appendChild(paramElement)
    let deleteParam=document.getElementsByClassName('deleteParam')
    for (item of deleteParam){
        item.addEventListener('click',(e)=>{
            if(confirm('Do you really wanna delete ?')){
                e.target.parentElement.remove()
                addedParamCount--
            }
        })
    }

    addedParamCount++
})

let submit=document.getElementById('submit')
submit.addEventListener('click',()=>{
    document.getElementById('responseJsonText').value="please wait..Fetching response..."
    let url=document.getElementById('url').value
    let requestType=document.querySelector("input[name='requestType']:checked").value
    let contentType=document.querySelector("input[name='contentType']:checked").value
  
    if (contentType == 'params') {
        data = {};
        for (let i = 0; i < addedParamCount + 1; i++) {
            if (document.getElementById('parameterKey' + (i + 1)) != undefined) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value; 
            }
        }
        data = JSON.stringify(data);
    }
    else {
        data = document.getElementById('requestJsonText').value;
    }
    console.log('URL is ', url);
    console.log('requestType is ', requestType);
    console.log('contentType is ', contentType);
    console.log('data is ', data);

    // if the request type is get, invoke fetch api to create a post request
    if (requestType=='GET'){
        fetch(url, {
            method: 'GET',   
        })
        .then(response=> response.text())
        .then((text) =>{
             document.getElementById('responseJsonText').value = text;
            // document.getElementById('responsePrism').innerHTML = text;
            // Prism.highlightAll();
        });
    }

    else{
        fetch(url, {
            method: 'POST', 
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
              }  
        })
        .then(response=> response.text())
        .then((text) =>{
             document.getElementById('responseJsonText').value =text;
            // document.getElementById('responsePrism').innerHTML = text;
            // Prism.highlightAll();
        });

    }


});