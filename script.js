const routes = {
  main: [
    'Mangalore','Surathkal','Mulki','Padubidri','Kaup','Katapady','Udupi','Kundapura'
  ],
  secondary: [
    'Padubidri','Nandikur','Palimar','Nitte','Karkala'
  ]
};

const busNames = [
  'Padmambika', 'Vishal', 'AKMS', 'Ganesh', 'Laxmi Ganesh',
  'Bharathi', 'Durgamba', 'Reshma', 'APM', 'SVT', 'Navadurga'
];

const buses = [
  { id: 'EXP1001', route: 'main', time: '07:00' },
  
  { id: 'EXP1002', route: 'main', time: '09:00' },
  { id: 'EXP2001', route: 'secondary', time: '08:00' },
  { id: 'EXP2002', route: 'secondary', time: '10:00' }
];

function populateTimes() {
  const timeSelect = document.getElementById('timeSelect');
  for (let h = 7; h <= 20; h++) {
    const hour = h.toString().padStart(2, '0') + ':00';
    const opt = document.createElement('option');
    opt.value = hour;
    opt.textContent = hour;
    timeSelect.appendChild(opt);
  }
}

function populateStops(routeKey) {
  const starts = document.getElementById('startSelect');
  const ends = document.getElementById('endSelect');
  starts.innerHTML = '';
  ends.innerHTML = '';
  routes[routeKey].forEach(stop => {
    const o1 = new Option(stop, stop);
    const o2 = new Option(stop, stop);
    starts.add(o1);
    ends.add(o2);
  });
}

function updateSelectionOutput() {
  const r = document.getElementById('routeSelect').value;
  const s = document.getElementById('startSelect').value;
  const e = document.getElementById('endSelect').value;
  const t = document.getElementById('timeSelect').value;
  document.getElementById('selectionOutput').textContent =
    `Route: ${r} | From: ${s} → To: ${e} | Time: ${t}`;

  // Display matching bus
  const found = buses.filter(bus => bus.route === r && bus.time === t);
  const busDisplay = document.getElementById('busDisplay');
  if (found.length > 0) {
    busDisplay.innerHTML = `<strong>Bus Available:</strong><br>` +
      found.map(b => {
        const randomName = busNames[Math.floor(Math.random() * busNames.length)];
        return `${b.id} - ${randomName} at ${b.time}`;
      }).join('<br>');
  } else {
    busDisplay.innerHTML = "<strong>No buses found at the selected time.</strong>";
  }
}

document.querySelectorAll('select').forEach(el =>
  el.addEventListener('change', updateSelectionOutput)
);

window.onload = function() {
  populateTimes();
  document.getElementById('routeSelect').addEventListener('change', e => {
    populateStops(e.target.value);
  });
  populateStops('main');
};
