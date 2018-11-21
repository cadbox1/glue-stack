# Filtering

## UX
- current state of filtering is seriously underdeveloped and more so on mobiles
- our solution works across desktops and mobiles
- involves an alphabetical list with 3 suggested filters at top
- clicking a filter changes to that filters selection screen.
- clicking okay changes back to the previous screen with that filter selected at the top and removed from the list

## API
QueryDSL is our best friend.

1. Querydsl turns http requests into queries. We can also do custom parsing.
2. Queries are composable so we can add our multi-tenancy filtering without string concatention

Accepted