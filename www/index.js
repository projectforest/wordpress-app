var FPApp = angular.module("FPApp", ["ionic"]);

FPApp.service("FPSvc", ["$http", "$rootScope", FPSvc]);

FPApp.controller("FPCtrl", ["$scope", "FPSvc", FPCtrl]);

function FPCtrl($scope, FPSvc){
  $scope.blogs = [];
  $scope.$on("FPApp.blogs", function(_, result){
    result.posts.forEach(function(b){
      $scope.blogs.push({
        name: b.author.name,
        avatar_URL: b.author.avatar_URL,
        title: b.title,
        URL: b.URL,
        excerpt: b.excerpt,
        featured_image: b.featured_image
      });
    });
  });

  FPSvc.loadBlogs();
}

function FPSvc($http, $rootScope) {
  this.loadBlogs = function(){
    $http.get("https://public-api.wordpress.com/rest/v1/freshly-pressed")
      .success(function(result){
        $rootScope.$broadcast("FPApp.blogs", result);
      });
  }
}