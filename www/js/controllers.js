angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})


angular.module('starter')
.controller('googleCtrl', ['$scope', '$state', '$rootScope', function($scope, $state,$rootScope ){

  $scope.singleLocation = $state.params.aId;

  var map;
  
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


angular.module('starter')
  .controller('loginController', ['$scope','$state', function($scope, $state){

    $scope.submit = function(username) {
      alert("Hello " + username )
      $state.go('app.search');
    }

    $scope.skipp = function(skip) {
      $state.go('app.search');
    }

  }])