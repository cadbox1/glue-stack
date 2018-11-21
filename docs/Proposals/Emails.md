# Emails

- use ses but need to handle throttling

## Architecture

API -> Kinesis: Event
Kinesis -> Event Handler Lambda: Event
Event Handler Lambda -> API: Get email preferences
Event Handler Lambda -> SQS: Email to be sent
SQS -> Email Lambda: Send this Email. Email Lambda can be scaled out as email output increases
Email Lambda -> SES: Send this email. Only ack message if successfully sent
