/* SheRises Collective – single source of truth for event timing.
   Times are absolute instants (South Africa, SAST = GMT+2), compared with the
   visitor's current time in UTC/GMT, so Past / Upcoming is always correct
   wherever the page is opened. Add a new event here (and a card on events.html)
   and every page updates itself. */
window.SHERISES_EVENTS = [
  { id: 'his-church',      title: 'His Church Conference',                    start: '2026-07-24T17:30:00+02:00', end: '2026-07-25T21:00:00+02:00', label: '24–25 July 2026',          venue: 'His Church, Cowies Hill, Pinetown' },
  { id: 'speaking-jul',    title: 'Speaking Engagements',                     start: '2026-07-25T09:00:00+02:00', end: '2026-07-25T13:00:00+02:00', label: '25 July 2026',             venue: 'Presbyterian Church, Pinetown' },
  { id: 'book-fair',       title: 'Durban International Book Fair',           start: '2026-08-06T09:00:00+02:00', end: '2026-08-10T22:00:00+02:00', label: '6–10 August 2026',         venue: 'Apart-Hotel Umhlanga' },
  { id: 'highway',         title: "Highway Christian Community Women's Conference", start: '2026-08-08T00:00:00+02:00', end: '2026-08-08T23:59:59+02:00', label: '8 August 2026', venue: '10 Harvey Road, Pinetown' },
  { id: 'ulundi',          title: "Women's Conference",                       start: '2026-08-10T00:00:00+02:00', end: '2026-08-10T23:59:59+02:00', label: '10 August 2026',          venue: 'Jesus Worship Centre, Ulundi' },
  { id: 'writing',         title: 'Writing Workshop',                         start: '2026-08-15T09:00:00+02:00', end: '2026-08-15T15:00:00+02:00', label: '15 August 2026',          venue: 'House of Harvest Family Church, Pinetown' },
  { id: 'flourish',        title: 'Flourish Expo',                            start: '2026-08-19T15:00:00+02:00', end: '2026-08-22T16:00:00+02:00', label: '19–22 August 2026',        venue: 'City Hill Church, Hillcrest' },
  { id: 'siyagcinwa',      title: "Siyagcinwa Women's Ministry",              start: '2026-08-20T00:00:00+02:00', end: '2026-08-20T23:59:59+02:00', label: '20 August 2026',          venue: '' },
  { id: 'still-elegant',   title: "Still Elegant Women's Conference",         start: '2026-08-21T18:00:00+02:00', end: '2026-08-22T21:00:00+02:00', label: '21–22 August 2026',        venue: 'Mount Zion Church' },
  { id: 'broken-vases',    title: 'Broken Vases Still Hold Beautiful Flowers', start: '2026-08-22T13:00:00+02:00', end: '2026-08-22T16:00:00+02:00', label: '22 August 2026',         venue: 'The Kariki Experience, Bothas Hill' },
  { id: 'journey-trail',   title: 'The Journey Trail',                        start: '2026-09-05T00:00:00+02:00', end: '2026-09-05T23:59:59+02:00', label: '5 September 2026',        venue: '' },
  { id: 'women-of-africa', title: 'Women of Africa',                          start: '2026-09-19T00:00:00+02:00', end: '2026-09-19T23:59:59+02:00', label: '19 September 2026',      venue: 'Restoration Covenant Ministries, Wentworth' },
  { id: 'market-3-oct',    title: 'Family Market Day',                        start: '2026-10-03T11:00:00+02:00', end: '2026-10-03T16:00:00+02:00', label: '3 October 2026',          venue: 'Hillcrest Collegiate Private School', url: 'market-3-october.html' },
  { id: 'summit',          title: 'Kingdom Leadership Summit: The Weight of Leadership', start: '2026-10-10T00:00:00+02:00', end: '2026-10-10T23:59:59+02:00', label: '10 October 2026', venue: 'Durban Jewish Club', url: 'kingdom-leadership-summit.html' },
  { id: 'singles',         title: "Singles Conference 2026",                  start: '2026-11-28T10:00:00+02:00', end: '2026-11-28T23:59:59+02:00', label: '28 November 2026',        venue: "Pilgrim's Rest", url: 'singles-conference.html' },
  { id: 'market-5-dec',    title: 'Christmas Market at the Phansi Museum',    start: '2026-12-05T10:00:00+02:00', end: '2026-12-05T15:00:00+02:00', label: '5 December 2026',         venue: 'Phansi Museum, Glenwood', url: 'market-5-december.html' },
  { id: 'wealth',          title: 'Building Wealth with Wisdom',              start: '2027-01-16T08:00:00+02:00', end: '2027-06-15T12:00:00+02:00', label: '16 Jan – 15 Jun 2027',    venue: 'Manors, Pinetown', url: 'wealth-with-wisdom.html' }
];

(function () {
  var now = Date.now(); // UTC-based instant, independent of the visitor's timezone
  var evs = window.SHERISES_EVENTS.map(function (e) {
    e.s = Date.parse(e.start); e.e = Date.parse(e.end); return e;
  });
  window.SHERISES_EVENTS_STATE = {
    now: now,
    upcoming: evs.filter(function (e) { return e.e >= now; }).sort(function (a, b) { return a.s - b.s; }),
    past: evs.filter(function (e) { return e.e < now; }).sort(function (a, b) { return b.e - a.e; })
  };

  /* Home page spotlight banner: shows the next event (or the one happening now). */
  document.addEventListener('DOMContentLoaded', function () {
    var banner = document.getElementById('eventSpotlight');
    if (!banner) return;
    var next = window.SHERISES_EVENTS_STATE.upcoming[0];
    if (!next) { banner.style.display = 'none'; return; }
    var live = next.s <= now;
    var link = banner.querySelector('a.spotlight-link');
    link.href = next.url || 'events.html';
    banner.querySelector('.spotlight-tag').textContent = live ? 'Happening Now' : 'Next Event';
    var t = banner.querySelector('.spotlight-text');
    t.innerHTML = '';
    t.appendChild(document.createTextNode(next.title + ' — '));
    var s = document.createElement('strong'); s.textContent = next.label; t.appendChild(s);
    if (next.venue) t.appendChild(document.createTextNode(' · ' + next.venue));
    banner.querySelector('.spotlight-cta').textContent = next.url ? 'Learn More →' : 'View Events →';
    banner.style.display = '';
  });

  /* Home page "Upcoming Events" preview: the next three upcoming events. */
  document.addEventListener('DOMContentLoaded', function () {
    var grid = document.getElementById('homeEventsGrid');
    if (!grid) return;
    var list = window.SHERISES_EVENTS_STATE.upcoming.slice(0, 3);
    if (!list.length) { var sec = grid.closest('section'); if (sec) sec.style.display = 'none'; return; }
    list.forEach(function (ev) {
      var tz = { timeZone: 'Africa/Johannesburg' };
      var a = new Date(ev.s), b = new Date(ev.e);
      var d1 = a.toLocaleString('en-GB', Object.assign({ day: 'numeric' }, tz)), d2 = b.toLocaleString('en-GB', Object.assign({ day: 'numeric' }, tz));
      var m1 = a.toLocaleString('en-GB', Object.assign({ month: 'long' }, tz)), m2 = b.toLocaleString('en-GB', Object.assign({ month: 'long' }, tz));
      var y1 = a.toLocaleString('en-GB', Object.assign({ year: 'numeric' }, tz)), y2 = b.toLocaleString('en-GB', Object.assign({ year: 'numeric' }, tz));
      var day, month;
      if (d1 === d2 && m1 === m2 && y1 === y2) { day = d1; month = m1 + ' ' + y1; }
      else if (m1 === m2 && y1 === y2) { day = d1 + '–' + d2; month = m1 + ' ' + y1; }
      else { day = d1 + ' ' + m1.slice(0, 3); month = '– ' + d2 + ' ' + m2.slice(0, 3) + ' ' + y2; }
      var card = document.createElement('a');
      card.className = 'event-preview-card'; card.href = ev.url || 'events.html'; card.style.textDecoration = 'none'; card.style.color = 'inherit';
      var dt = document.createElement('div'); dt.className = 'event-preview-date';
      var sd = document.createElement('span'); sd.className = 'day'; sd.textContent = day;
      var sm = document.createElement('span'); sm.className = 'month'; sm.textContent = month;
      dt.appendChild(sd); dt.appendChild(sm);
      var body = document.createElement('div'); body.className = 'event-preview-body';
      var h3 = document.createElement('h3'); h3.textContent = ev.title; body.appendChild(h3);
      if (ev.venue) { var p = document.createElement('p'); p.textContent = ev.venue; body.appendChild(p); }
      card.appendChild(dt); card.appendChild(body); grid.appendChild(card);
    });
  });
})();
