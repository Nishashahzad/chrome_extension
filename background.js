let user_signed_in = false;

chrome.identity.onSignInChanged.addlistener(function (id, status){
alert(status);
});

chrome.runtime.onMessege.addlistener((request, sender, sendResponse) => {
    if (request.messege === 'get_access_token') {
        chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
            console.log(auth_token);
        });
        sendResponse(true);
    } else if (request.messege === 'get_profile') {
        chrome.identity.getProfileUserInfo({ accountStatus: 'ANY' }, function (user_info) {
            console.log(user_info);
        });
        sendResponse(true);
    } else if (request.messege === 'get_contacts') {
        chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
            let fetch_url = ``;
            let fetch_options = {
                Headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            fetch(fetch_url, fetch_options)
                .then(res => res.json())
                .then(res => {
                    if (res.memberCount) {
                        const members = res.memberResourceNames;
                        fetch_url = ``;

                        members.forEach(member => {
                            fetch_url += `&resourceNames=${encodeURIComponent(member)}`;
                        });

                        fetch(fetch_url, fetch_options)
                            .then(res => res.json())
                            .then(res => console.log(res));
                    }
                });
        });
    }
    else if (request.messege === 'create_contacts') {
        chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
            let fetch_url = ``;

            let fetch_options = {
                method: 'POST',
                Headers: {
                    'Authorization': `Bearer ${token}`,
                    'content-Type': 'application/json'
                },
                body: JSON.stringify({
                    'names': [
                        {
                            "givenName": "Johnny",
                            "familyName": "Silver"
                        }
                    ]
                })
            }
            fetch(fetch_url, fetch_options)
                .then(res => res.json())
                .then(res => console.log(res));
        });
    }
    else if (request.messege === 'delete_contacts') {
        chrome.identity.getAuthToken({ interactive: true }, function (auth_token) {
            let fetch_url = ``;
            let fetch_options = {
                Headers: {
                    'Authorization': `Bearer ${token}`
                }
            }

            fetch(fetch_url, fetch_options)
                .then(res => res.json())
                .then(res => {
                    if(res.memberCount){
                    const members = res.memberResourceNames;

                    fetch_options.method = 'DELETE',
                    fetch_url = ``;

                    fetch(fetch_url, fetch_options)
                        .then(res => console.log(res));
                    }
                });
            });
        }
});