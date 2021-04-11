var radios = document.forms["bg-list"].elements["bg-selector"];
    for(radio in radios){
        radios[radio].onclick = function(){
            alert(this.value);
        }
    }