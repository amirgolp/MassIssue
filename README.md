Note 1: Copy the data into the issues.csv, remove additional columns so it looks like the template.csv

Note 2: Make sure that in the "title" column, no entries has comma in its string

Note 3: Change the config in the header of CreateIssueFromJSON.js (repo, userID, TOKEN)

Note 4: github api has a rate limiter, maybe better to use setInterval/clearInterval for large executions

run:
    node CreateIssueFromJSON.js
