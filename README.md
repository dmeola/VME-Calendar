# VME-Calendar
Creates calendar events from a web page for veterinary students at OSU

The students' schedule of classes changes each day throughout the semester, and is shared via a webpage. 

The tool scrapes the page and gets the event name, location, start & end time. It then formats the data in preparation for
transfer to the user's google calendar. It creates a calendar and adds events via API. It also handles OAuth, requesting
the user's permission to make calendar modifications. 

It is not very polished yet and has a few shortcomings. The source of main.js would ideally be a chrome extension or bookmarklet but currently must be copied and pasted into the chrome dev tools console. It will prompt the user for a calendar ID and API key. 

To get a Calendar ID: Create a google calendar. Go to the calendar's settings and copy the calendar ID to the right of 'Calendar Address'. Example ID: 7hhd2bmal39pns45f58gprtse8@group.calendar.google.com

To get an API key: Request this through Google's Developer console.
