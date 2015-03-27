# VME-Calendar
Creates calendar events from a web page for veterinary students at OSU

The students' schedule of classes changes each day throughout the semester, and is shared via a webpage. 

The tool scrapes the page and gets the event name, location, start & end time. It then formats the data in preparation for
transfer to the user's google calendar. It creates a calendar and adds events via API. It also handles OAuth, requesting
the user's permission to make calendar modifications. 
