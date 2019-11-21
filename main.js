var data;
var members;
var apiLink;
if (document.title.includes("Senate")) {
  apiLink = "https://api.propublica.org/congress/v1/113/senate/members.json"
} else {
  apiLink = "https://api.propublica.org/congress/v1/113/house/members.json";
}

fetch(apiLink, {
  method: "GET",
  headers: {
    "X-API-key": "QldaOh304w8jLHRmPrvLMTPhVYauJuHGNKkSqKNb"
  }
}).then(function (response) {
  return response.json();
}).then(function (json) {
  data = json;
  members = data.results[0].members;
  starter();
  myTable(members);
  createListStates(members);


}).catch(function (error) {
  console.log(error);
});



// This function connects the event listeners with the fltering function)
function starter() {
  document
    .getElementById("republican")
    .addEventListener("change", function () {
      filterPartyState(members);
    });
  document
    .getElementById("democrat")
    .addEventListener("change", function () {
      filterPartyState(members);
    });
  document
    .getElementById("independent")
    .addEventListener("change", function () {
      filterPartyState(members);
    });
  document
    .getElementById("state-filter")
    .addEventListener("change", function () {
      filterPartyState(members);
    });
  filterPartyState(members);
}

// To format senate data as a table
function myTable(members) {
  var tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  for (var i = 0; i < members.length; i++) {
    var tr = document.createElement("tr");

    var name = document.createElement("td");

    var senatorName =
      members[i].last_name +
      " " +
      members[i].first_name +
      " " +
      (members[i].middle_name || "");

    if (!members[i].url) {
      name.textContent = senatorName;
    } else {
      var nameLink = document.createElement("a");
      nameLink.textContent = senatorName;
      nameLink.setAttribute("href", members[i].url);
      nameLink.setAttribute("target", "_blank");

      name.appendChild(nameLink);
    }

    var party = document.createElement("td");
    party.textContent = members[i].party;

    var state = document.createElement("td");
    state.textContent = members[i].state;

    var seniority = document.createElement("td");
    seniority.textContent = members[i].seniority;

    var percVotes = document.createElement("td");
    percVotes.textContent = members[i].votes_with_party_pct;

    tr.append(name, party, state, seniority, percVotes); // these functions push the data into the HTML.
    tbody.appendChild(tr);
  }
}




// To create list with states in html.

function createListStates(members) {
  var listStates = [];
  for (var i = 0; i < members.length; i++) {
    if (!listStates.includes(members[i].state)) {
      listStates.push(members[i].state);
    }
  }
  listStates.sort();
  for (var i = 0; i < listStates.length; i++) {
    var option = document.createElement("option");
    option.textContent = listStates[i];
    option.setAttribute("value", listStates[i]);
    document.getElementById("state-filter").append(option);
  }
}

//To filter the members by party and state 
function filterPartyState(members) {

  var republican = document.getElementById("republican");
  var democrat = document.getElementById("democrat");
  var independent = document.getElementById("independent");
  var state = document.getElementById("state-filter").value;

  const selected = [];

  if (
    republican.checked == false &&
    democrat.checked == false &&
    independent.checked == false &&
    state == "all"
  ) {
    myTable(members);
  } else {
    for (var i = 0; i < members.length; i++) {
      if (republican.checked && members[i].party == "R" && state == "all") {
        selected.push(members[i]);
      }
      if (democrat.checked && members[i].party == "D" && state == "all") {
        selected.push(members[i]);
      }
      if (independent.checked && members[i].party == "I" && state == "all") {
        selected.push(members[i]);
      }
      if (
        republican.checked == false &&
        democrat.checked == false &&
        independent.checked == false &&
        state == members[i].state
      ) {
        selected.push(members[i]);
      }
      if (
        republican.checked &&
        members[i].party == "R" &&
        state == members[i].state
      ) {
        selected.push(members[i]);
      }
      if (
        democrat.checked &&
        members[i].party == "D" &&
        state == members[i].state
      ) {
        selected.push(members[i]);
      }
      if (
        independent.checked &&
        members[i].party == "I" &&
        state == members[i].state
      ) {
        selected.push(members[i]);
      }
    }

    myTable(selected);
  }
}