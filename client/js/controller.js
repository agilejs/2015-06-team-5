(function() {
    'use strict';

    var app = angular.module('MovieDatabase');

    app.controller('AppController', function($scope) {
        $scope.title = 'The Movie Database';
    });

    app.controller('WelcomeController',
        function($scope, $location, movieList) {
        $scope.movies = movieList.data;
    });

    app.controller('MoviesListController',
        function($scope, $location, movieList) {

        $scope.movies = movieList.data;
        $scope.order = 'title';
        $scope.changeOrder = function(){
            $scope.order  = $scope.order==='title' ? '-title' : 'title';
        };
    });

    app.controller('MoviesAddController',
        function($scope, $http, $location) {
        $scope.movie = {};
        $scope.save = function (movie) {
            $http.post('/movies', movie)
            .success(function(res) {
                $location.path('/movies/' + res.id);
            });
        };
    });

    app.controller('MovieDetailController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.delete = function () {
            $http.delete('/movies/' + $scope.movie.id).success(function (res) {
                $location.path('/movies');
            });
        };
    });

    app.controller('MovieEditController',
        function($scope, $http, $location, movie) {

        $scope.movie = movie.data;
        $scope.save = function () {
            $http.put('/movies/' + $scope.movie.id, $scope.movie)
            .success(function (res) {
                $location.path('/movies/' + $scope.movie.id);
            });
        };
    });

    function ProblemController($scope, $location) {
        $scope.culprit = $location.search().culprit || 'unknown beast';
    }

    app.controller('NotFoundController', ProblemController);
    app.controller('ErrorController', ProblemController);

    app.controller('NavController',
        function ($scope, $location, $route) {

        $scope.activePath = null;
        $scope.$on('$routeChangeSuccess',
          function() {
            $scope.activePath = $location.path();
        });
    });

    app.directive('twitter', [
        function() {
            return {
                link: function(scope, element, attr) {
                    setTimeout(function() {
                            twttr.widgets.createShareButton(
                                attr.url,
                                element[0],
                                function(el) {}, {
                                    count: 'none',
                                    text: attr.text
                                }
                            );
                    });
                }
            }
        }
    ]);

})();
