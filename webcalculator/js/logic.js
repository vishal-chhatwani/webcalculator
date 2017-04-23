
function buttonPress(x) {

    var inputBox= document.getElementById('inputValue').value;
    //alert(inputValue);
     var input=x;
    inputBox=inputBox + input;
    document.getElementById('inputValue').value=inputBox;
    document.getElementById('resultValue').value="";

}

function operation(op) {

    var inputBox= document.getElementById('inputValue').value;
    var result=0;
    if(op=="DEL"){

        var leng=inputBox.length;
        leng--;
        inputBox=inputBox.substr(0,leng);
        document.getElementById('inputValue').value=inputBox;
    }
    else if(op=="C"){
        document.getElementById('inputValue').value="";
        document.getElementById('resultValue').value="";
    }
    else if(op=="sqrt"){

        result=Math.sqrt(inputBox);
        if(!isNaN(result)){
            document.getElementById('inputValue').value="";
            document.getElementById('resultValue').value=result;
            if(localStorage.getItem("words")!== null){
                var words = [{"values":"4+4","result":"8"}];
                words = JSON.parse(localStorage.getItem("words"));
                if(words.length>=10){
                    words.shift();
                }
                words.push({"values":inputBox,"result":result});
                localStorage.setItem("words", JSON.stringify(words));
            }
            else{
                var words=[{"values":inputBox,"result":result}];
                localStorage.setItem("words", JSON.stringify(words));
            }
            addToHistory();
        }
        else{
            document.getElementById('inputValue').value="Error. Try again.";
        }

    }
    else if(op=="="){
        if(inputBox!=""){

            try{
                result=eval(inputBox);
                document.getElementById('resultValue').value=result;
                document.getElementById('inputValue').value="";
                if(localStorage.getItem("words")!== null){
                    var words = [{"values":"4+4","result":"8"}];
                    words = JSON.parse(localStorage.getItem("words"));
                    if(words.length>=10){
                        words.shift();
                    }
                    words.push({"values":inputBox,"result":result});
                    localStorage.setItem("words", JSON.stringify(words));
                }
                else{
                    var words=[{"values":inputBox,"result":result}];
                    localStorage.setItem("words", JSON.stringify(words));
                }
            }catch(err){
                document.getElementById('inputValue').value="Error. Try again.";
            }


        }

        addToHistory();

    }
    else{
        var inputBox= document.getElementById('inputValue').value;
        var input=op;
        inputBox=inputBox + input;
        document.getElementById('inputValue').value=inputBox;
    }
}

function addToHistory() {

    if(localStorage.getItem("words")!== null) {
        var words = [{"values": "4+4", "result": "8"}];
        words = JSON.parse(localStorage.getItem("words"));
        var serialNo=1;
        for(i=words.length-1;i>=0;i--){
            document.getElementById('value'+serialNo).innerText=words[i].values;
            document.getElementById('result'+serialNo).innerText=words[i].result;
            serialNo++;
        }
    }
    else{
        for(i=1;i<=10;i++){
            document.getElementById('value'+i).innerText="";
            document.getElementById('result'+i).innerText="";
        }
    }

}

function eraseHistory() {

    localStorage.clear();
    addToHistory();
}

window.onload = function() {
    addToHistory();
};