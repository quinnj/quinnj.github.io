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
    var k = 0;
    for (ii = 0; ii < response.routes.length; ii++) {
        path = response.routes[ii].overview_path
        for (i = 0; i < path.length-1; i++) {
            accs = 0
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
                    //accs += 1
                    heat[k] = new google.maps.LatLng(lats[j], lng)
                    k++;
                }
            }
        }
    }
    heatmap = new google.maps.visualization.HeatmapLayer({
          data: heat,
          opacity: 0.9,
          radius: 15
        });
    heatmap.setMap(map);
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
          opacity: 0.9,
          radius: 20
        });
    heatmap2.setMap(map2);
}

//TODO
 //route info box
  //total # of accidents along route
  //google info on route
  //fatal accident stats
