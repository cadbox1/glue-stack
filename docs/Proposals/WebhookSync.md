# Webhook Sync

There seems to be some divide between webhooks and polling apis
a lot of applications simply want to sync data from one to the other
webhooks seem like the perfect option but there are issues around missing the requests
how do you get historical data? do you have to use the API? if so, maybe we should just poll.

polling involves a stateful application that can keep track of what currently has been synced or not. 
Its also common to just sync everything on every poll which is inefficient

webhook sync is a way to push data to another application.
We had an integration that was very clean and used webhooks to sync data.
unfortunately it didn't sync historical data that was there before the webhook so i created a SQL query to generate CURL script that I then ran to hit the webhook listener. Neat.

What if applications could do this? 
Applications like stitch work in this area and have some interesting stuff.
What we need our producer app to do is maintain the state of the listener as a cursor of the last event they've seen.
We already store their webhook url, the cursor could live next to it.
The curosr could be the last modified date or it could be the last_modified_by_event_id we're implementing in the activity log.
when the consumber 200 oks the message we increment the cursor on our end.
All we need then is a sync button which can sync over data in bursts so we don't overload the consumer.
We can do this using SQS delays.
We can either sync the event log which might take longer but would allow more fine grained events or we could sync all the current state of data that has changed since their last cursor