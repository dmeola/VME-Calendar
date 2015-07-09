

/* MAIN
* @description: OSU VME Students can create a calendar from their class schedule
* 				at https://cvmcommunity.osu.edu/vmeii
* @author: Daniel Meola
*
*/
//model
_scope = {
	"events":[

	]
}

calendarCreator = {
	//splits up the dates from the DOM into a date, start time, and end time
	dateConvertor : function(date){
		dateTime = date.split("\n");
		date = dateTime[1];
		time = dateTime[2].replace(/:00+/gi, ':00 ').replace(/:10+/gi, ':10 ').replace(/:20+/gi, ':20 ').replace(/:30+/gi, ':30 ').replace(/:40+/gi, ':40 ').replace(/:50+/gi, ':50 ').split("-");
		//make sure event has a time before converting to ISO Date format
		if(time != "") {
			start = new Date(Date.parse(date+' '+time[0])).toISOString();
			end = new Date(Date.parse(date+' '+time[1])).toISOString();
			type = "dateTime";
		} else {
			start = new Date(Date.parse(date)).toISOString().split('T')[0];
			end = new Date(Date.parse(date)).toISOString().split('T')[0];
			type = "date";
		}
		dateTime = {
			"date" 	: date,
			"start" : start,
			"end" 	: end,
			"type"	: type
		}
		return dateTime;
	},
	//moves through the DOM collecting calendar event data
	parseDom : function(){
		jQuery('#semester table tbody tr').each(function( index ) {

		  	title = jQuery(this).children().filter("td:eq(1)").children().filter("strong").text();
		  	description = jQuery(this).children().filter("td:eq(1)").clone().children().remove().end().text().trim();
		  	eventLocation = jQuery(this).children().filter(":nth-child(3)").text().trim().replace(/\n/g,' ');
		  	date = jQuery(this).children().filter("td:eq(0)").text().replace(/ /g,'');
		  	dateTime = calendarCreator.dateConvertor(date);
		  		start = dateTime["start"];
		  		end = dateTime["end"];

			calendarCreator.storeEvent(index, start, end, title, description, eventLocation);
		});
	},
	//stores events in _scope
	storeEvent : function(index, start, end, title, description, location){
		if(type == 'dateTime') {
			//dateType = "dateTime";
			_scope.events[index] = {
				"start" : {"dateTime" : start},
				"end" : {"dateTime" : end},
				"summary" : title,
				"description" : description,
				"location" : location
			}
		} else {	//All day event (no start and end time)
			_scope.events[index] = {
				"start" : {"date" : start},
				"end" : {"date" : end},
				"summary" : title,
				"description" : description,
				"location" : location
			}
		}
	},
	//create a google calendar event
	createEvent : function(calendarEvent){
		//Google API rate limit of one request per second
		makeApiCall(calendarEvent);
	},
	//initialize
	init : function(){
		jQuery.getScript("https://apis.google.com/js/client.js?onload=handleClientLoad").done(function(){
			jQuery.getScript("https://rawgit.com/creativecouple/jquery-timing/master/jquery-timing.min.js").done(function(){
				//prompt user for calendar ID and API key
				_scope.calendarId = prompt("Please enter your google calendar ID","");
				_scope.apiKey = prompt("Please enter the API key","");
				//scrape DOM for event data
				calendarCreator.parseDom();
				//add events to calendar
				calendarCreator.createEvent(_scope.events);
			})
		});		//load google api connector
		//jQuery.getScript("calendar.js").done(function(){console.log('calendar loaded')});		//load calendar connector
		//calendarCreator.parseDom();
	}
}
calendarCreator.init();

//CALENDAR
var clientId = '986209927278-26j8h40ti147efmsvm8v5rca9qq784eu.apps.googleusercontent.com';
var scopes = 'https://www.googleapis.com/auth/calendar';
//var apiKey = 'AIzaSyDgHYMRWdGFo_8Xi1styqVBcF6oUlNquUc';
//calendarId = 'c3q7fg5m5dauvssurjbd3rd7f8@group.calendar.google.com';

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
    //makeApiCall();
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

function makeApiCall(calendarEvents) {
	//add event
	jQuery.each(calendarEvents, function(index){
		var counter=index;
		setTimeout(function(){
			calendarEvent = calendarEvents[index];
			console.log(calendarEvent.summary);
			gapi.client.load('calendar', 'v3', function() {
			    var request = gapi.client.calendar.events.insert({
			    	"calendarId" : _scope.calendarId,
			    	"resource" : calendarEvent
			    });
			    //Google API 1 second rate limit
			    setTimeout(function(){
			    	request.execute();
			    }, counter*1000)
			});
		}, counter*1000+1000)
	})
}

handleAuthClick();

    //list events
 //  gapi.client.load('calendar', 'v3', function() {
 //    var request = gapi.client.calendar.events.list({
 //      'calendarId': calendarId
 //    });

 //    request.execute(function(resp) {
 //      for (var i = 0; i < resp.items.length; i++) {
 //        var div = document.createElement('div');
 //        div.appendChild(document.createTextNode(resp.items[i].summary));
 //        document.getElementById('semester').appendChild(div);
 //      }
 //    });
 // });

