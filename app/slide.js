(function () {
    'use strict';

    var scripts = document.getElementsByTagName("script");
    var currentScriptPath = scripts[scripts.length-1].src;
    //console.log(currentScriptPath);

    angular.module('ac-angular-slide', ['ngRoute'])
        .directive('acAngularSlide', AcAngularSlide);


    AcAngularSlide.$inject = ['$location', '$route', '$window', '$interval'];

    function AcAngularSlide($location, $route, $window, $interval) {
        return {
            restrict: 'E',
            scope: {
                parametro: '='
            },
            templateUrl: currentScriptPath.replace('.js', '.html'),
            controller: function ($scope, $compile, $http, $window, $interval) {

                var vm = this;
                vm.slide01 = true;
                $interval(callAtTimeout, 5000);
                vm.homeWidth = $window.innerWidth + 'px';
                vm.homeHeight = ($window.innerWidth / 1.95) + 'px';

                calcTextosSlide();
                $window.onresize = function() {
                    vm.homeWidth = $window.innerWidth + 'px';
                    vm.homeHeight = ($window.innerWidth / 1.95) + 'px';
                    calcTextosSlide();
                    $scope.$apply();
                };

                function calcTextosSlide(){
                    var textosSlide = document.getElementsByClassName('texto-slide');
                    for(var i = 0; i<textosSlide.length; i++){

                        var textoSlideHeight = textosSlide[i].style.height;
                        console.log((textoSlideHeight / 2));
                        textosSlide[i].style.top = ((parseFloat(vm.homeHeight) / 2) - (parseFloat(vm.homeHeight)/8))  + 'px';
                    }
                }

                function callAtTimeout(){
                    //vm.slide01 = true;
                    //vm.slide02 = true;
                    if(vm.slide01){
                        vm.slide01 = false;
                        vm.slide02 = true;
                        vm.slide03 = false;
                        vm.slide04 = false;
                    }else if(vm.slide02){

                        vm.slide01 = false;
                        vm.slide02 = false;
                        vm.slide03 = true;
                        vm.slide04 = false;
                    }else if(vm.slide03){

                        vm.slide01 = false;
                        vm.slide02 = false;
                        vm.slide03 = false;
                        vm.slide04 = true;
                    }else if(vm.slide04){

                        vm.slide01 = true;
                        vm.slide02 = false;
                        vm.slide03 = false;
                        vm.slide04 = false;
                    }

                    //vm.slide02 = !vm.slide02;
                }

            },

            controllerAs: 'sliderCtrl'
        };
    }

})();