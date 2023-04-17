const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();

const url = process.env.MONGODB;

const client = new MongoClient(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const youth = [
    {
      firstName: "Alice",
      lastName: "Smith",
      email: "alice.smith@example.com",
      ssn: "123-45-6789",
      fireID: "12345",
      programs: ["STEM Club", "Community Service"],
      active: true,
      attached_forms: [],
      attended_events: []
    },
    {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bob.johnson@example.com",
      ssn: "234-56-7890",
      fireID: "23456",
      programs: ["Sports Team"],
      active: true,
      attached_forms: [],
      attended_events: []
    },
    {
      firstName: "Charlie",
      lastName: "Brown",
      email: "charlie.brown@example.com",
      ssn: "345-67-8901",
      fireID: "34567",
      programs: ["Arts Club", "Community Service"],
      active: false,
      attached_forms: [],
      attended_events: []
    }
];

const forms = [
    {
      name: "Volunteer Sign-Up Sheet",
      description: "Form for volunteers to sign up for upcoming community service events.",
      date: new Date("2022-02-01T08:00:00"),
      content: "Volunteer sign-up sheet",
      programs: ["Community Service"],
      associated_youth_id: "",
      associated_event_id: ""
    },
    {
      name: "Field Trip Permission Slip",
      description: "Form for parents/guardians to provide consent for their child to participate in a STEM Club field trip.",
      date: new Date("2022-03-15T10:30:00"),
      content: "Permission slip for field trip",
      programs: ["STEM Club"],
      associated_youth_id: "",
      associated_event_id: ""
    },
    {
      name: "Medical Treatment Consent Form",
      description: "Form for parents/guardians to provide consent for their child to receive medical treatment during a sports team event.",
      date: new Date("2022-04-02T14:00:00"),
      content: "Consent form for medical treatment",
      programs: ["Sports Team"],
      associated_youth_id: "",
      associated_event_id: ""
    }
  ];
  

  const events = [
  {
    name: "STEM Club Meeting",
    description: "Monthly meeting of the STEM Club where members learn about and discuss topics related to science, technology, engineering, and mathematics.",
    code: "ABC123",
    date: new Date("2022-03-15T10:30:00"),
    programs: ["STEM Club"],
    staff: ["staff_123", "staff_456"],
    attended_youth: [],
    attached_forms: []
  },
  {
    name: "Garden Service Project",
    description: "Volunteer opportunity to help clean up a local park and plant new flowers.",
    code: "DEF456",
    date: new Date("2022-05-10T16:30:00"),
    programs: ["Community Service"],
    staff: ["staff_234", "staff_567"],
    attended_youth: [],
    attached_forms: []
  },
  {
    name: "Food Service Project",
    description: "Volunteer opportunity to help sort and distribute food at a local food bank.",
    code: "GHI789",
    date: new Date("2022-07-01T12:00:00"),
    programs: ["Community Service"],
    staff: ["staff_345"],
    attended_youth: [],
    attached_forms: []
  }
];

function addObjectID(seedData){
    for (let i = 0; i < seedData.length; ++i){
        seedData[i]._id = new ObjectId();
    }
    return seedData;
}

let formSeed = addObjectID(forms);
let eventSeed = addObjectID(events);
let youthSeed = addObjectID(youth);

function connectModels(){
  //Assign one to each
  for (let i = 0; i <eventSeed.length; ++i){

      //Tie forms to events
      formSeed[i].associated_event_id = eventSeed[i]._id;
      eventSeed[i].attached_forms.push(formSeed[i]._id);
    

      //Tie events to youth
      eventSeed[i].attended_youth.push(youthSeed[i]._id);
      youthSeed[i].attended_events.push(eventSeed[i].code);
      

      //Tie forms to youth
      formSeed[formSeed.length-i-1].associated_youth_id = (youthSeed[i]._id);
      youthSeed[youthSeed.length-i-1].attached_forms.push(formSeed[i]._id);
  }

  //Add an extra link for events and youth relationship
  eventSeed[1].attended_youth.push(youthSeed[2]._id);
  youthSeed[2].attended_events.push(eventSeed[1].code);
  eventSeed[1].attended_youth.push(youthSeed[0]._id);
  youthSeed[0].attended_events.push(eventSeed[1].code);
}

connectModels();

const addEntries = async (col_name, entries) => {
    const col = client.db("seed").collection(col_name);
    console.log("Connected to DB");

    console.log(`Adding entries to the DB...`);
    const { insertedCount } = await col.insertMany(entries);
    console.log(`Inserted ${insertedCount} new entries`);
};

(async () => {
  await client.connect();
  await client.db("seed").collection("youths").deleteMany({});
  await client.db("seed").collection("events").deleteMany({});
  await client.db("seed").collection("forms").deleteMany({});

  await addEntries("youths", youthSeed);
  await addEntries("events",eventSeed);
  await addEntries("forms",formSeed);
  await client.close();
})();
