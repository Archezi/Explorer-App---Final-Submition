angular.module('starter')
.controller('googleCtrl', ['$scope', '$state', '$rootScope', function($scope, $state,$rootScope ){

  $scope.singleLocation = $state.params.aId;

  var map;
  $scope.additionalInfo = "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt blanditiis voluptate, magni aut tempora, non ratione .";
  $scope.placeNameArr = [];
  console.log($scope.placeNameArr);
  
  //    GOOGLE MAP API INTEGRATION 

  function initialise (position) {
    $scope.$apply(function(){

      var center = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
      map = new google.maps.Map(document.getElementById('map'),{
        center: center,
        zoom:12
      });
      
      var defaultBounds = new google.maps.LatLngBounds(
        new google.maps.LatLng(),
        new google.maps.LatLng());

      var option = {
        bounds: defaultBounds,
        types: ['(cities)']
      };

      var request = {
        location: center,
        radius: 8047,
        types: [ 'Park', 'Restaurant', 'Café']
        // 'Airport' , 'Café' , 'Church' , 'Park' , 'University'
        // Posible location types from Google API 
      };  

      infowindow = new google.maps.InfoWindow();
      
      var service = new google.maps.places.PlacesService(map);

      service.nearbySearch(request, callback);

    })
  }
  function callback(results, stattus) {
    if(stattus == google.maps.places.PlacesServiceStatus.OK) {
      for (var i=0; i < results.length; i++) {
        var place = results[i]
        createMarker(results[i]);
      }
    
      $scope.$apply(function () {
        $scope.places = results;

        // DATA BAINDING 
      });
      console.log(results);
    }
  }
  function createMarker(place) {
    var placeLoc = place.geometry.location;
     photos = place.photos;
     
    if (!photos) {
        return;
    }
    var marker = new google.maps.Marker({
      
      map: map,
      position: place.geometry.location,
      titile: place.name,
        
    });

    google.maps.event.addListener(marker, 'click', function(){

      infowindow.setContent(

        '<div class="marker"><h4>' + place.name + '</h4><br>' +
        '<img src='+ place.photos[0].getUrl({'maxWidth': 300, 'maxHeight': 300}) +'>' + '<br>' + 
        '<p>' + 'Rating:' + place.rating + '</p>'+ '<p>' +'Open Now ' + place.opening_hours.open_now + '</p>'
       
        );
      
      infowindow.open(map,this);
      
      
    })
    
    $scope.placeNameArr.push(place.name);
  }

  navigator.geolocation.getCurrentPosition(initialise);
  
  $scope.removeObject = function( place ) {
      
    var index = $scope.places.indexOf(place);
    // splice is a java script array function 
    $scope.places.splice(index, 1);
  }

}]);