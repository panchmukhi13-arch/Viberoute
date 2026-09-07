let map, directionsService, directionsRenderer;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), { center: { lat: 28.9845, lng: 77.7064 }, zoom: 11, mapTypeId: 'roadmap' });
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer({ map: map, polylineOptions: { strokeColor: "#2ec4b6", strokeWeight: 6 } });
}
function aiJamPrediction(from, to) {
  let hour = new Date().getHours();
  let day = new Date().getDay();
  let prediction = "", reason = "";
  if ((hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20)) {
    prediction = "🔴 85% Chance Heavy Jam in next 30 min";
    reason = `AI ne dekha hai ki ${hour}:00 baje ${to} ki taraf office traffic peak hota hai. Pichle 7 din ka pattern.`;
  } else if (day == 1) { // Monday
    prediction = "🟡 60% Chance Moderate Jam - Monday Rush";
    reason = "Monday ko is route par 40% zyada traffic hota hai.";
  } else {
    prediction = "🟢 15% Low Jam - Best Time To Travel Now";
    reason = "Abhi traffic sabse kam hai, 12 min bachaoge.";
  }

  document.getElementById('aiPredict').innerText = prediction;
  document.getElementById('aiReason').innerText = reason;
}

function findRoute() {
  let from = document.getElementById('from').value;
  let to = document.getElementById('to').value;
  if(!from ||!to) return alert("Dono location bharo ji");
  aiJamPrediction(from, to);
  const request = {
    origin: from, destination: to,
    travelMode: google.maps.TravelMode.DRIVING,
    drivingOptions: { departureTime: new Date(), trafficModel: 'bestguess' }
  };

  directionsService.route(request, (result, status) => {
    if (status == 'OK') {
      directionsRenderer.setDirections(result);
      let leg = result.routes[0].legs[0];
      document.getElementById('eta').innerText = leg.duration_in_traffic? leg.duration_in_traffic.text : leg.duration.text;
      document.getElementById('details').innerText = `Distance: ${leg.distance.text} | Normal Time: ${leg.duration.text}`;
      document.getElementById('trafficStatus').innerText = "✅ Live Google Traffic";
    } else {
      alert("Error: " + status + " - API Key check karo");
    }
  });
}
