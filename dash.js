let topics = [];

// Add Topic
function addTopic(){

    let subject = document.getElementById("subject").value;
    let topic = document.getElementById("topic").value;
    let confidence = document.getElementById("confidence").value;

    let newTopic = {
        subject,
        topic,
        confidence,
        date: new Date(),
        state: "retained"
    };

    topics.push(newTopic);
    updateUI();
}

// Simulate Decay
function evaluateDecay(){

    let today = new Date();

    topics.forEach(t => {

        let days = (today - new Date(t.date)) / (1000*60*60*24);

        if(days > 30 && t.confidence <= 3){
            t.state = "forgotten";
        }
        else if(days > 15){
            t.state = "fading";
        }
        else{
            t.state = "retained";
        }
    });
}

// Update UI
function updateUI(){

    evaluateDecay();

    let retained = document.getElementById("retainedList");
    let fading = document.getElementById("fadingList");
    let forgotten = document.getElementById("forgottenList");

    retained.innerHTML = "";
    fading.innerHTML = "";
    forgotten.innerHTML = "";

    topics.forEach(t => {

        let item = `<li>${t.subject} - ${t.topic}</li>`;

        if(t.state === "retained") retained.innerHTML += item;
        if(t.state === "fading") fading.innerHTML += item;
        if(t.state === "forgotten") forgotten.innerHTML += item;
    });

    generateRecovery();
}

// Recall Simulation
function startRecall(){

    let random = topics[Math.floor(Math.random()*topics.length)];

    if(!random){
        document.getElementById("recallQuestion").innerText =
        "No topics available";
        return;
    }

    document.getElementById("recallQuestion").innerText =
    `Explain: ${random.topic}`;

    // simulate result
    let success = Math.random();

    if(success < 0.5){
        random.state = "forgotten";
    } else {
        random.state = "retained";
    }

    updateUI();
}

// Recovery Suggestions
function generateRecovery(){

    let list = document.getElementById("recoveryList");
    list.innerHTML = "";

    topics.forEach(t => {
        if(t.state === "forgotten" || t.state === "fading"){
            list.innerHTML += 
            `<li>Revise ${t.topic} (${t.subject}) for 10 mins</li>`;
        }
    });
}