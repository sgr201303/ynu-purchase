! function(angular, window, b) {
    var app = angular.module('myApp', ['ngRoute']);

    app.directive("navbar", function() {
        return {
            restrict: "E",
            templateUrl: './public/template/nav.html',
            replace: true
        }
    });
    app.directive("foot", function() {
        return {
            restrict: "E",
            templateUrl: './public/template/footerTpl.html',
            replace: true
        }
    });


    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when("/index", {
            templateUrl: "./public/template/indexTpl.html",
            controller: "indexController"
        })

        .when("/teacherIndex", {
                templateUrl: "./public/template/teaFillOut.html",
                controller: "teaFormCtr"
            })
            .when("/TeaHistory", {
                templateUrl: "./public/template/teaViewHistory.html",
                controller: "CheckMessageController"
            })
            .when("/teaViewHanding", {
                templateUrl: "./public/template/teaViewHanding.html",
                controller: "handingController"
            })
            .when("/check", {
                templateUrl: "./public/template/financial_checkTpl.html",
                //controller: "workController"
            })
            .when("/ExaIndex", {
                templateUrl: "./public/template/examinantIndex.html",
                //controller: "workController"
            })
            .when("/ExaDetail", {
                templateUrl: "./public/template/ExaDetail.html",
                //controller: "workController"
            })
            .when("/operatorIndex", {
                templateUrl: "./public/template/operatorIndex.html",
                //controller: "workController"
            })
            .when("/operatorIndex", {
                templateUrl: "./public/template/operatorIndex.html",
                //controller: "workController"
            })
            .when("/negRusult", {
                templateUrl: "./public/template/negotiationResult.html",
                //controller: "workController"
            })
            .when("/operatorHistory", {
                templateUrl: "./public/template/operatorHistory.html",
                controller: "opHistoryController"
            })
            .when("/negotiationList", {
                templateUrl: "./public/template/negotiationList.html",
                //controller: "workController"
            })
            .when("/negotiationCheck", {
                templateUrl: "./public/template/negotiationCheck.html",
                //controller: "workController"
            })
            .when("/operatorHistoryDetail", {
                templateUrl: "./public/template/operatorHistoryDetail.html",
                //controller: "workController"
            })
            .when("/approvalHistory", {
                templateUrl: "./public/template/approvalHistoryTpl.html",
                //controller: "workController"
            })
            .when("/approvalClassify1", {
                templateUrl: "./public/template/approvalClassify1Tpl.html",
                //controller: "workController"
            })
            .when("/approvalClassify2", {
                templateUrl: "./public/template/approvalClassify2Tpl.html",
                //controller: "workController"
            })
            .when("/projectVerify", {
                templateUrl: "./public/template/projectVerify.html",
                //controller: "proworkController"
            })
            .otherwise({ redirectTo: "/index" });

    }]);
    /**
     *  王浩 2016-06-12
     *  起始
     */
    //token 服务
    app.service('tokenHander', ['', function() {
        return {
            setToken: function(token) {
                return sessionStorage.set("token", token);
            },
            getToken: function() {
                return sessionStorage.getItem("token");
            }
        }

    }])
    app.service("pageSet",function(){

    })
    app.controller("handingController", function($scope, $http) {
        // $http({
        //         url: " ?token=" + tokenhandler.getToken(),
        //         method: "get"
        //     }

        // ).success(function(response) {
        //     $scope.handle = response.data;
        // });
        // 测试数据
        $scope.handle = [{
            projectId: "20160107-01",
            purchaseType: "C-工程",
            totalMoney: "11,234",
            time: "2014-10-3",
            proType: "待初审",
            suggestion: "可以"
        }, {
            projectId: "20160107-01",
            purchaseType: "C-工程",
            totalMoney: "11,234",
            time: "2014-10-3",
            proType: "待初审",
            suggestion: "不错呦"
        }];
        $scope.methods = {
            showDetail: function(message) {
                console.log(message)
                $scope.message = message; //切换toggle里面的message
            },
            download: function(id) {
                // 下载申请表 
                $http({
                    url: "  ?projectId=" + id, //+"&token=" + tokenHander.getToken(),
                    method: "get"
                }).success(function(response) {
                    // do something
                })

            }
        }

    })

    app.controller('CheckMessageController', function($scope) {
        // $http({
        //     url:" ",
        //     method:"get",
        // }).success(function(response){
        //     $scope.historyItems = response.data;
        // })
        $scope.historyItems = [{
            projectId: "20160107-01",
            purchaseType: "C-工程",
            totalMoney: "11,234",
            time: "2014-10-3",
            proType: "待初审",
            suggestion: "可以"
        }, {
            projectId: "20160107-01",
            purchaseType: "C-工程",
            totalMoney: "11,234",
            time: "2014-10-3",
            proType: "待初审",
            suggestion: "不错呦"
        }];

        $scope.methods = {
            showDetail: function(message, id) {
                $scope.pro = {
                    message: message,
                    id: id
                }
            },
            download: function(id) {
                // 下载申请表 
                $http({
                    url: "  ?projectId=" + id, //+"&token=" + tokenHander.getToken(),
                    method: "get"
                }).success(function(response) {
                    // do something
                })
            }
        }
    });

/**
 * 结束
 */


    app.controller("indexController", function($scope, $http) {
        location.href = "/login.html";
    })

    app.controller('teaFormCtr', function($scope, $http, $timeout, $rootScope) {
        $scope.form = {};
        $scope.items = [];
        $scope.form.token = 'abc1234';

        $rootScope.addItem = function() {
            var item = {};
            item['类型'] = "";
            item['通用名称'] = "";
            item['数量'] = "";
            item['计量单位'] = "";
            item['预算单价'] = "";
            item['合计金额'] = "";
            item['交货地点'] = "";
            $scope.items.push(item);
        }
        $scope.addItem();
        $scope.removeItem = function(index) {
            $scope.items.splice(index, 1)
        }
        $scope.clear = function() {
            if (confirm('是否确认清空？')) {
                $scope.form = {};
                $scope.items = [];
                $scope.addItem();
            } else {}
        }

        $scope.formSubmit = function() {
            if (confirm('是否确认提交？')) {

                console.log($scope.form, $scope.items, $scope.form.type);

                $http({
                    url: "XXX",
                    method: "post",
                    data: {
                        token: "abc1234",
                        "采购类型": $scope.form.type,
                        "项目名称": $scope.form.name,
                        "项目负责人": $scope.form.leader,
                        "电话": $scope.form.telephone,
                        "固话": $scope.form.guhua,
                        "预算总额": $scope.form.money,
                        "资金来源": $scope.form.source,
                        "购置理由": $scope.form.reason,
                        "table": $scope.items
                    }
                }).success(function(response) {
                    if (response == "1") {
                        alert('已成功提交');
                        $timeout(function() {
                            location.href = "#/teaViewHanding";
                        }, 3000);
                    } else if (response == "2") {
                        alert('ERROR');
                    }
                })
            }
        }
        $scope.draftSubmit = function() {
            if (confirm('是否确定存入草稿？')) {

                console.log($scope.form, $scope.items, $scope.form.type);

                $http({
                    url: "XXX",
                    method: "post",
                    data: {
                        token: "abc1234",
                        "采购类型": $scope.form.type,
                        "项目名称": $scope.form.name,
                        "项目负责人": $scope.form.leader,
                        "电话": $scope.form.telephone,
                        "固话": $scope.form.guhua,
                        "预算总额": $scope.form.money,
                        "资金来源": $scope.form.source,
                        "购置理由": $scope.form.reason,
                        "table": $scope.items
                    }
                }).success(function(response) {
                    if (response == "1") {
                        alert('已成功提交');
                        $timeout(function() {
                            location.href = "#/teaViewHanding";
                        }, 3000);
                    } else if (response == "2") {
                        alert('ERROR');
                    }
                })
            }
        }
        $scope.loadDraft = function() {
            $http({
                url: "XXX",
                method: "Get",
                data: {
                    token: "abc1234",
                }
            }).success(function(response) {
                $scope.form.type = response.urchaseType;
                $scope.form.name = response.urchaseType;
                $scope.form.leader = response.urchaseType;
                $scope.form.telephone = response.urchaseType;
                $scope.form.guhua = response.urchaseType;
                $scope.form.money = response.urchaseType;
                $scope.form.source = response.urchaseType;
                $scope.form.reason = response.urchaseType;
                $scope.items = [];
                $scope.items = response.table;
                for (var i = 1; i++; i <= response.table.length) {
                    $rootScope.addItem();
                }
            })
        }
        $scope.change = function() {
            if ($scope.form.type == "国产" || $scope.form.type == "进口") {
                $scope.xianshi = true;
                console.log('asd')
            } else if ($scope.form.type == "C-工程") {
                $scope.xianshi = false;
                $scope.replace = "C-工程"
            } else if ($scope.form.type == "S-服务") {
                $scope.xianshi = false;
                $scope.replace = "S-服务"
            }
        }



    });

    app.controller('opHistoryController', function($scope) {
        // $scope.bold = "bold";
        $scope.key = '';
        $scope.data = [
            { id: "cg20160517-04", totalMoney: "32,434", updataTime: "2016-01-17" },
            { id: "cg20150517-04", totalMoney: "32,434", updataTime: "2016-01-17" },
            { id: "ck20160517-04", totalMoney: "32,434", updataTime: "2016-01-17" },
            { id: "cy20130517-04", totalMoney: "32,434", updataTime: "2016-01-17" },
            { id: "cy20130517-04", totalMoney: "32,434", updataTime: "2016-01-17" },
        ];
    });
}(angular, window);
