// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})


.controller("MainController", ["$scope", "$ionicPopup", function($scope, $ionicPopup){
  var animationDuration = 10000; //ensure that this matches what's in the css duration.
  var holdDuration = 2000;
  var darkenDuration = 2000; // ensure that this less than darken-background duration.
  
  var holdTimer;
  var breathOutTimer;
  var resetTimer;
  
  //var pitchPop = new Audio("pitch-up-down.wav")
  $scope.backgroundAnimation = "stressed-background";
  
  $scope.reset = function(){
    $scope.animation = null;
    $scope.backgroundAnimation = "darken-background";
    setTimeout(function(){$scope.backgroundAnimation = "stressed-background";}, darkenDuration);
  }
  
  $scope.onTouch = function(){
    $scope.message = "breath in";
    $scope.animation = "animated pulse";
    $scope.backgroundAnimation = "clear-background";
    holdTimer = setTimeout(function(){$scope.message = "hold";$scope.$apply();}, (animationDuration/2)-(holdDuration));
    breathOutTimer = setTimeout(function(){$scope.message = "breath out";$scope.$apply();}, (animationDuration/2));
    resetTimer = setTimeout(function(){$scope.reset();$scope.$apply();}, animationDuration);
    //pitchPop.play();
  }
  
  $scope.onRelease = function(){
    $scope.reset();
  }
  
  $scope.reset = function(){
    $scope.animation = null;
    $scope.message = null;
    clearTimeout(holdTimer);
    clearTimeout(breathOutTimer);
    clearTimeout(resetTimer);
    $scope.backgroundAnimation = "darken-background";
    setTimeout(function(){$scope.backgroundAnimation = "stressed-background";$scope.$apply();}, darkenDuration);
    //pitchPop.pause();
    //pitchPop.currentTime = 0;
  }
  
  $scope.onInfo = function(){
    $ionicPopup.alert({
      title: "About",
      template: "<p>This device you are holding is a stress multiplexer.</p>\
                <p>Take a dose of nostress by holding the <b>hold me</b> button and following the prompts.</p>\
                <p>Recommended dosage: Three nostress, every eight hours.</p>",
      okType: "button-royal"
    })
  }
}])