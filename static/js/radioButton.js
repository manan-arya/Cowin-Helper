window.onload = function() {
     document.getElementById('ifYes').style.display = 'none';
}

function yesnoCheck() {
    if (document.getElementById('yesCheck').checked) {
        document.getElementById('ifYes').style.display = 'block';
    } 
    else {
        document.getElementById('ifYes').style.display = 'none';
    }
}