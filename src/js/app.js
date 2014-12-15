'use strict';

var $ = require('jquery'),
  _ = require('underscore'),
  moment = require('moment'),
  locs = [
    {
      name: 'New York',
      dates: {
        arrive: null,
        depart: null
      },
      coord: new google.maps.LatLng(40.712784, -74.005941)
    },
    {
      name: 'Aukland',
      dates: {
        arrive: moment('2015-01-02'),
        depart: moment('2015-01-12')
      },
      coord: new google.maps.LatLng(-36.8404, 174.7399)
    },
    {
      name: 'Christchurch',
      dates: {
        arrive: moment('2015-01-13'),
        depart: moment('2015-01-13')
      },
      coord: new google.maps.LatLng(-43.532054, 172.636225)
    },
    {
      name: 'Seoul',
      dates: {
        arrive: moment('2015-01-14'),
        depart: moment('2015-01-17')
      },
      coord: new google.maps.LatLng(37.566535, 126.977969)
    },
    {
      name: 'Manila',
      dates: {
        arrive: moment('2015-01-17'),
        depart: moment('2015-01-18')
      },
      coord: new google.maps.LatLng(14.599512, 120.984219)
    },
    {
      name: 'Davao',
      dates: {
        arrive: moment('2015-01-18'),
        depart: moment('2015-01-22')
      },
      coord: new google.maps.LatLng(7.190708, 125.455341)
    },
    {
      name: 'Osaka',
      dates: {
        arrive: moment('2015-01-22'),
        depart: moment('2015-01-28')
      },
      coord: new google.maps.LatLng(34.693738, 135.502165)
    },
    {
      name: 'Tokyo',
      dates: {
        arrive: moment('2015-01-28'),
        depart: moment('2015-01-29')
      },
      coord: new google.maps.LatLng(35.689487, 139.691706)
    },
    {
      home: true,
      name: 'New York',
      dates: {
        arrive: moment('2015-01-29'),
        depart: moment('2014-12-31')
      },
      coord: new google.maps.LatLng(40.712784, -74.005941)
    }
  ],
  coords = _.pluck(locs, 'coord'),
  styles = [
      {
        "stylers":[
          {
            "hue": "#220039"
          },
          {
            "saturation": 100
          }
        ]
      },
      {
        "featureType": "water",
        "stylers": [
          {
            "color": "#f3f3f3"
          }
        ]
      }
    ],
  pathOptions = {
    path: coords,
    geodesic: true,
    strokeColor: '#ffe800',
    strokeOpacity: 1.0,
    strokeWeight: 2
  },
  mapOptions = {
    center: coords[0],
    zoom: 3,
    styles: styles
  },
  contentStr = '<div id="content" style="width:150px;"><h1>$name</h1>$body</div>';

function whereAreThey () {
  var now = moment('2015-12-30'),
    where = null;

  locs.forEach(function (loc, i) {
    var d = loc.dates;

    // First one just using to complete the path
    if (i > 0) {

      // Departure should take a back seat unless it's the only option
      if (d.depart.isSame(now, 'day')) {
        where = loc;
      }

      // Arrival should tromp departure
      if (d.arrive.isSame(now, 'day')) {
        where = loc;
      }

      // This tromps everything else.
      if (d.depart.isAfter(now, 'day') && d.arrive.isBefore(now, 'day')) {
        where = loc;
      }
    }
  });

  if (!where) {
    where = locs[locs.length - 1];
  }

  return where;
}

function findNextLoc (loc) {
  return _.indexOf(locs, loc) + 1;
};

function getBody (loc) {
  var body = '',
    d = loc.dates,
    arrive = '',
    depart = '',
    next = findNextLoc(loc);

  if (d.arrive) {
    arrive = '<p><b>Arrive:</b> ' + d.arrive.format('MMM D, YYYY') + '</p>';
  }

  if (d.depart) {
    depart = '<p><b>Depart:</b> ' + d.depart.format('MMM D, YYYY') + '</p>';
  }

  if (loc.home) {
    body = depart + arrive;
    body += '<p><a href="1" id="next-link">First Stop: ' + locs[1].name + '</a></p>';
  } else {
    body = arrive + depart;
    body += '<p><a href="' + next + '" id="next-link">Next: ' + locs[next].name + ' ➔</a></p>';
  }

  return body;
}

function initialize() {
  var flightPath = new google.maps.Polyline(pathOptions),
    infowindow = new google.maps.InfoWindow({maxWidth: 900}),
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions),
    currentLoc = whereAreThey(),
    markers = [];

  locs.forEach(function (loc, i) {
    var marker = new google.maps.Marker({
      position: loc.coord,
      map: map,
      title: loc.name
    });

    google.maps.event.addListener(marker, 'click', function () {
      var c = contentStr.replace('$name', loc.name);
      c = c.replace('$body', getBody(loc));
      infowindow.setContent(c);
      infowindow.open(map, marker);
    });

    if (currentLoc === loc) {
      google.maps.event.trigger(marker, 'click');
    }

    markers.push(marker);
  });

  flightPath.setMap(map);

  if (currentLoc) {
    map.panTo(currentLoc.coord);
  }

  $('body').on('click', '#next-link', function (e) {
    e.preventDefault();
    var target = $(e.target),
      i = target.attr('href');

    map.panTo(locs[i].coord);
    google.maps.event.trigger(markers[i], 'click');
  });
}

google.maps.event.addDomListener(window, 'load', initialize);
