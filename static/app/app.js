'use strict';
var tustar = angular.module('tustar', [
    'ui.bootstrap'

]);

tustar.controller('SidebarCtrl', ['$scope', function($scope){

    $scope.menuList = [{
        link: 'www.baidu.com',
        name: 'baidu'
    }, {
        link: 'www.sina.com',
        name: 'sina'
    }, {
        link: 'www.tecent.com',
        name: 'tecent'
    }];
}]);

tustar.controller('demo', ['$scope', function($scope){
    $scope.a = 111;
}]);
