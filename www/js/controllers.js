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

// .controller('PlaylistsCtrl', function($scope) {
//   $scope.playlists = [
//     { title: 'Reggae', id: 1 },
//     { title: 'Chill', id: 2 },
//     { title: 'Dubstep', id: 3 },
//     { title: 'Indie', id: 4 },
//     { title: 'Rap', id: 5 },
//     { title: 'Cowbell', id: 6 }
//   ];
// })

// .controller('PlaylistCtrl', function($scope, $stateParams) {
// });
angular.module('starter')
.controller('googleCtrl', ['$scope', '$state', '$rootScope', function($scope, $state,$rootScope ){

  $scope.singleLocation = $state.params.aId;

  var map;
  
  $scope.placeNameArr = [];
  console.log($scope.placeNameArr);
  

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
        // -33.8902, 151.1759
        // -33.8474, 151.2631
      var option = {
        bounds: defaultBounds,
        types: ['(cities)']
      };

      var input = document.getElementById('pac-input');
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      // var autocomplete = new google.maps.places.Autocomplete(input, option) ;

      var request = {
        location: center,
        radius: 8047,
        types: [ 'park', 'restaurant']
        // 
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
        // console.log(results);

      }
       $scope.$apply(function () {
                  $scope.places = results;
                  console.log( $scope.places);
              });

    }
  }
  // $scope.markerCreation =
   function createMarker(place) {
    var placeLoc = place.geometry.location;
     photos = place.photos;
     // console.log(photos);
    if (!photos) {
      return;

      // $scope.googlePhoto = place.photo;
      // console.log($scope.googlePhoto);
    }
    
    var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
      // titile: place.name,
      // icon: photos[0].getUrl({'maxWidth': 35, 'maxHeight': 35})
    
    });
    // $scope.photoList = photos;
    // $scope.markerList = place.photos[0];
    //  console.log($scope.markerList);
    

    google.maps.event.addListener(marker, 'click', function(){

      infowindow.setContent('<div><strong>' + place.name + '</strong><br>' +
              'Place ID: ' + place.place_id + '<br>' +
               '<img src='+ place.photos[0].getUrl({'maxWidth': 175, 'maxHeight': 175}) +'>' + '<br>' + 'Rating:' + place.rating + '<img src='+ place.photos +'>' + '</div>');
      infowindow.open(map,this);
      // console.log(infowindow);
      
    })
    // console.log(place);
    $scope.placeNameArr.push(place.name);
  }

  navigator.geolocation.getCurrentPosition(initialise);
  // google.maps.event.addDomListener(window, 'load', initialize);

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