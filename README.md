# MissionSAFE-backend

This is the repository for our server, which communicates with a MongoDB cluster.
The routes and their behavior are as follows ( [*] indicates not completed ):

- /api
    - /users
        - /staff
            - GET / \t # Get all Staff
            - POST / # Create Staff
            - GET /active # Get all active Staff
            - GET /inactive # Get all inactive Staff
            - GET /:email # Get Staff with email
            - GET /:program # Get all Staff associated with program
            - /:fireID
                - GET / # Get Staff with fireID
                - PUT /activate # Activate Staff with fireID
                - PUT /deactivate # Deactivate Staff with fireID
        - /youth
            - GET / # Get all Youth
            - POST / # Create Youth
            - GET /active # Get all active Youth
            - GET /inactive # Get all inactive Youth
            - GET /:email # Get Youth with email
            - GET /:program # Get all Youth in program
            - /:fireID
                - GET / # Get Youth with fireID
                - [*] GET /forms # Get Forms for Youth with fireID
                - [*] GET /events # Get Events for Youth with fireID
                - PUT /activate # Activate Youth with fireID
                - PUT /deactivate # Deactivate Youth with fireID
                - PUT /form # Add Form to Youth with fireID
    - /events
        - POST / # Create event
        - /:eventCode
            - [*] GET / # Get Event with eventCode
            - [*] GET /forms # Get all Forms for Event with eventCode
            - [*] GET /staff # Get all Staff for Event with eventCode
            - PUT / # Add Staff to Event with eventCode
            - PUT /attend # Add Youth to Event with eventCode
            - PUT /form # Add Form to Event with eventCode