function searchsortedfirst(v, x) {
    lo = -1
    hi = v.length+1
    while (lo < hi-1) {
        m = (lo+hi)>>>1
        if (v[m] < x) {
            lo = m
        } else {
            hi = m
        }
    }
    return hi
}

function searchsortedlast(v, x) {
    lo = -1
    hi = v.length+1
    while (lo < hi-1) {
        m = (lo+hi)>>>1
        if (x < v[m]) {
            hi = m
        } else {
            lo = m
        }
    }
    return lo
}

function addHeat(response) {
    var heat = [];
    var accidents = [0,0,0];
    var routenames = [];
    var k = 0;
    for (ii = 0; ii < response.routes.length; ii++) {
        path = response.routes[ii].overview_path
        routenames[ii] = response.routes[ii].summary
        for (i = 0; i < path.length-1; i++) {
            lat1 = path[i].k
            long1 = path[i].B
            lat2 = path[i+1].k
            long2 = path[i+1].B
            latlower = Math.min(lat1,lat2)
            latupper = Math.max(lat1,lat2)
            longlower = Math.min(long1,long2)
            longupper = Math.max(long1,long2)
            latlowbnd = searchsortedlast(lats, latlower)
            latupbnd = searchsortedfirst(lats, latupper)
            for (j = latlowbnd; j < latupbnd; j++) {
                lng = longs[j]
                if (longlower <= lng && lng <= longupper) {
                    heat[k] = new google.maps.LatLng(lats[j], lng)
                    k++;
                    accidents[ii] += 1;
                }
            }
        }
    }
    heatmap = new google.maps.visualization.HeatmapLayer({
          data: heat,
          opacity: 0.8,
          radius: 15,
          dissipating: true
        });
    heatmap.setMap(map);
    document.querySelector('#info1').classList.add('hover');
    var T = accidents.reduce(function(a, b) { return a + b; });
    for (i = 0; i < routenames.length; i++) {
        document.querySelector('#info1-'+i).innerHTML = "<strong>" + routenames[i] + "</strong>";
        document.querySelector('#info1-'+i).setAttribute("style","display:block");
        document.querySelector('#info1-'+i+i).setAttribute("style","display:block");
        document.querySelector('#info1-'+i+i).setAttribute("style","width:" + (accidents[i]/T)*100 + "%");
        document.querySelector('#info1-'+i+i).innerHTML = accidents[i];
    }
    for (i = 2; i > routenames.length-1; i--) {
        document.querySelector('#info1-'+i).setAttribute("style","display:none");
        document.querySelector('#info1-'+i+i).setAttribute("style","display:none");
    }
    if (routenames.length == 1) {
        document.querySelector('#info1-00').setAttribute("style","display:none");
    }
}

function addHeat2(bnds) {
    var latlower = bnds.getSouthWest().lat();
    var latupper = bnds.getNorthEast().lat();
    var longlower = bnds.getSouthWest().lng();
    var longupper = bnds.getNorthEast().lng();
    var heat = [];
    var k = 0;
    latlowbnd = searchsortedlast(lats, latlower)
    latupbnd = searchsortedfirst(lats, latupper)
    for (j = latlowbnd; j < latupbnd; j++) {
        lng = longs[j]
        if (longlower <= lng && lng <= longupper) {
            //accs += 1
            heat[k] = new google.maps.LatLng(lats[j], lng)
            k++;
        }
    }
    heatmap2 = new google.maps.visualization.HeatmapLayer({
          data: heat,
          opacity: 0.8,
          radius: 15,
          dissipating: true
        });
    heatmap2.setMap(map2);
}

//TODO
 //route info box
  //total # of accidents along route
  //google info on route
  //fatal accident stats
