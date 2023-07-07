document.querySelector('div').addEventListener('click', function(){
    chrome.runtime.sendMesssege( {message: 'delete_contact'});
})