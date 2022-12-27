# MissionSAFE-backend

This is the repository for our server, which communicates with a MongoDB cluster.
The routes and their behavior are as follows ( [*] indicates not completed ):

- /api
    - /users
        - /staff
            - GET / # Get all Staff
            - POST / # Create Staff
            - GET /active # Get all active Staff
            - GET /inactive # Get all inactive Staff
            - GET byEmail/:email # Get Staff with email
            - GET byProgram/:program # Get all Staff associated with program
            - GET byID/:fireID # Get Staff with fireID
            - PUT /activate/:fireID # Activate Staff with fireID
            - PUT /deactivate/:fireID # Deactivate Staff with fireID
        - /youth
            - GET / # Get all Youth
            - POST / # Create Youth
            - GET /active # Get all active Youth
            - GET /inactive # Get all inactive Youth
            - GET byEmail/:email # Get Youth with email
            - GET byProgram/:program # Get all Youth in program
            - GET byID/:fireID # Get Youth with fireID
            - PUT /activate/:fireID # Activate Youth with fireID
            - PUT /deactivate/:fireID # Deactivate Youth with fireID
            - PUT /form/:fireID # Add Form to Youth with fireID
            - [*] GET /forms/:fireID # Get Forms for Youth with fireID
            - [*] GET /events/:fireID # Get Events for Youth with fireID
    - /events
        - POST / # Create event
        - PUT /addStaff/:eventCode # Add Staff to Event with eventCode
        - PUT /attend/:eventCode # Add Youth to Event with eventCode
        - PUT /form/:eventCode # Add Form to Event with eventCode
        - [*] GET /:eventCode # Get Event with eventCode
        - [*] GET /forms/:eventCode # Get all Forms for Event with eventCode
        - [*] GET /staff/:eventCode # Get all Staff for Event with eventCode
            
