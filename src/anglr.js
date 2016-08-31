var app=angular.module('myApp', []);

app.controller('myCtrl', function($scope,$http) {
console.log("firsasst function");
$scope.cards='';

  $scope.fns=function(){
    console.log("first function");
       $http({
          url: 'http://127.0.0.1:1337/getusertime', 
          method: "GET",
          params: {txtval: $scope.theme1}
       }).success(function(data, status, headers, config) {
          
              $scope.cards = '';
          $http({
              url: 'http://127.0.0.1:1337/getusertime2', 
              method: "GET",
              params: {txtval: $scope.cards}
           }).success(function(data, status, headers, config) {
              document.getElementById("crossword").innerHTML = data;
          });

           $http.get('http://127.0.0.1:1337/getusertime3').
              success(function(data, status, headers, config) {
                console.log(data);
              $scope.cards = data;
          });
      });
   	/* $http({
          url: 'http://127.0.0.1:1337/getusertime2', 
          method: "GET",
          params: {txtval: $scope.cards}
       }).success(function(data, status, headers, config) {

          document.getElementById("crossword").innerHTML = data;
          console.log(data);          
      });*/
  }

});
