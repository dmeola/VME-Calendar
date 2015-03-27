var clientId = '986209927278-26j8h40ti147efmsvm8v5rca9qq784eu.apps.googleusercontent.com';
var apiKey = 'AIzaSyBu1dZIfedJKxib2rk6-jvQ24ntCSCfgis';
var scopes = 'https://www.googleapis.com/auth/calendar';
var calendarId = 'vqcnfkk7k31nk71arkf52d969s@group.calendar.google.com';

function handleClientLoad() {
  gapi.client.setApiKey(apiKey);
  window.setTimeout(checkAuth,1);
  checkAuth();
}

function checkAuth() {
  gapi.auth.authorize({client_id: clientId, scope: scopes, immediate: true},
      handleAuthResult);
}

function handleAuthResult(authResult) {
  //var authorizeButton = document.getElementById('authorize-button');
  if (authResult) {
   // authorizeButton.style.visibility = 'hidden';
    makeApiCall();
  } else {
    //authorizeButton.style.visibility = '';
    //authorizeButton.onclick = handleAuthClick;
   }
}

function handleAuthClick(event) {
  gapi.auth.authorize(
      {client_id: clientId, scope: scopes, immediate: false},
      handleAuthResult);
  return false;
}

function makeApiCall() {
  gapi.client.load('calendar', 'v3', function() {
    var request = gapi.client.calendar.events.list({
      'calendarId': calendarId;
    });

    request.execute(function(resp) {
      for (var i = 0; i < resp.items.length; i++) {
        var div = document.createElement('div');
        div.appendChild(document.createTextNode(resp.items[i].summary));
        document.getElementById('semester').appendChild(div);
      }
    });
  });
}

handleAuthClick();