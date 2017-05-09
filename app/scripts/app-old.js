'use strict';

/**
 * @ngdoc overview
 * @name angularApp
 * @description
 * # angularApp
 *
 * Main module of the application.
 */
angular
  .module('angularApp', [
//    'ngAnimate',
//    'ngCookies',
//    'ngResource',
    'ngRoute',
//    'ngSanitize',
//    'ngTouch'
  ])
  .factory("pageService",function(){
	    var ret = {selected:1};
		return ret;
  })
  .run(function($http,$rootScope){
		$http.get("utils/configuration.json")
			.then(function(data){
				$rootScope.configuration=data.data;
			});
      $rootScope.main={
        title:"Sistema Calderon - Template",
		env:"dev"
      };
      $rootScope.profile={
        id:"4",
        name:"Ivan Calderon"
      }
	  $rootScope.page={
		  title:"SC - Template",
		  "subtitle":"Home"
	  }			
  })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboardController'
      })
      .when('/programs', {
        templateUrl: 'views/bases/list.html',
        controller: 'programsController'
      })
      .when('/schedualing', {
        templateUrl: 'views/schedualing.html',
        controller: 'schedualingController'
      })
      .when('/users', {
        templateUrl: 'views/bases/list.html',
        controller: 'usersController'
      })
      .when('/content', {
        templateUrl: 'views/content.html',
        controller: 'contentController'
      })
      .when('/users/mailing', {
        templateUrl: 'views/mailing.html',
        controller: 'mailingController'
      })	  
      .when('/users/admins', {
        templateUrl: 'views/admins.html',
        controller: 'adminsController'
      })	  
      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settingsController'
      })
	  .when('/users/create',{
		templateUrl:'views/bases/form.html',
		controller:'usersController'
	  })
	  .when('/programs/create',{
		templateUrl:'views/bases/form.html',
		controller:'programsController'
	  })
	  .when('/settings/apparence',{
		templateUrl:'views/settings/apparence.html',
		controller:'mainController'
	  })
	  .when('/settings/menu',{
		templateUrl:'views/settings/menu.html',
		controller:'settingsController'
	  })
	  .when('/settings/data',{
		templateUrl:'views/settings/data.html',
		controller:'settingsController'
	  })
	  .when('/settings/security',{
		templateUrl:'views/settings/security.html',
		controller:'settingsController'
	  })
      .otherwise({
        redirectTo: '/',
		controller: 'dashboardController'
      })
  })
 .controller("mainController",function($scope,pageService,$http,$rootScope){
	  $scope.clear=function(){
		$http.get("utils/configuration.json")
			.then(function(data){
				$rootScope.configuration=data.data;
			});
	  };	  
      $scope.currentLanguage={language:"en",flag:"United-States-of-America.42ddfa1a"};
})
 .controller("navController",function($scope,pageService,$http,$rootScope){
	$scope.total=$rootScope.configuration.options.length + 2;
	$scope.page=pageService;
 })
 .controller("dashboardController",function($scope,pageService){
	pageService.selected=1;
})
 .controller("programsController",function($scope,pageService){
	pageService.selected=2;
	$scope.statusSelect=false;
	$scope.model="programs";
	$scope.object={
			$data:[
				{
					id:1,description:"First Program",price:1200,status:"Inactive",select:false
				},
				{					
					id:2,description:"Second Program",price:1000,status:"Active",select:false
				},
				{					
					id:3,description:"third Program",price:2000,status:"Active",select:false
					
				}		
			],
			tableParams:{
				sorting:{
					field:"",
					direction:""
				},
				filter:{
					field:"",
					operator:"",
					value:""
				},
				titles:[{field:'',width:'5%',caption:'All',filter:0,options:[],placeholder:'',callback:'selectAll'},
					    {field:'id',width:'5%',caption:'ID',filter:1,options:[],placeholder:'',callback:'orderBy'},
						{field:'description',width:'50%',caption:'Description',filter:1,options:[],placeholder:'Description of program',callback:'orderBy'},
						{field:'price',width:'15%',caption:'Price',filter:1,options:[],placeholder:'Price of program',callback:'orderBy'},
						{field:'status',width:'15%',caption:'Status',filter:2,options:['All','Active','Inactive'],placeholder:'Status Active or Inactive',callback:'orderBy'},
						{field:'',width:'10%',caption:'Actions',filter:0,options:[],callback:''}
					   ],
				extraButtons:[]
			}
	};
	$scope.clickTitle=function(callback,field){
		switch(callback){
			case "selectAll":
				$scope.statusSelect=!$scope.statusSelect;
				for (var i=0;i<$scope.object.$data.length;i++){
					$scope.object.$data[i].select=$scope.statusSelect;
				}
				break;
			case "orderBy":
				$scope.object.tableParams.sorting.field=field;
				$scope.object.tableParams.sorting.direction=$scope.object.tableParams.sorting.direction=="Asc"?"Desc":"Asc";
				break;
		}
	};
	$scope.selectOne=function(state){
		if(state){
			if(!$scope.statusSelect){
				$scope.statusSelect=true;
			}
		}else{
			if($scope.statusSelect){
				var enc=false;
				for (var i=0;i<$scope.object.$data.length;i++){
					if($scope.object.$data[i].select){
						enc=true;
						break;
					}
				}
				$scope.statusSelect=enc;
			}
		}
	};
	$scope.clearSorting=function(){
		$scope.object.tableParams.sorting.field="";
		$scope.object.tableParams.sorting.direction="";
	};
	$scope.clearFilter=function(){
		$scope.object.tableParams.filter.field="";
		$scope.object.tableParams.filter.operator="";
		$scope.object.tableParams.filter.value="";
	};
	$scope.changeLanguage=function(lang){
		alert(lang);
	};	
 })
 .controller("schedualingController",function($scope,pageService){
	pageService.selected=3;
 })
 .controller("contentController",function($scope,pageService){
	pageService.selected=4;
 })
 .controller("usersController",function($scope,pageService){
	pageService.selected=5;
	$scope.statusSelect=false;
	$scope.model="users";
	//Objeto maestro Inicio
	$scope.object={
			$data:[
				{
					id:1,name:"Iván Calderon",nickname:"Icalderon",sex:"Mascle",age:37,offer:"Free",offerExpirationDate:"31-12-2017",select:false
				},
				{					
					id:2,name:"Iraima Morantes",nickname:"Iraimamr",sex:"Female",age:36,offer:"Pay",offerExpirationDate:"31-10-2017",select:false
				},
				{					
					id:3,name:"Gabriela Leon",nickname:"Gleon",sex:"Female",age:28,offer:"VIP",offerExpirationDate:"31-12-2019",select:false
					
				}		
			],
			tableParams:{
				sorting:{
					field:"",
					direction:""
				},
				filter:{
					field:"",
					operator:"",
					value:""
				},
				titles:[{field:'',width:'5%',caption:'All',filter:0,options:[],callback:'selectAll'},
					    {field:'id',width:'5%',caption:'ID',filter:1,options:[],callback:'orderBy'},
						{field:'name',width:'20%',caption:'Name',filter:1,options:[],callback:'orderBy'},
						{field:'nickname',width:'16%',caption:'Nickname',filter:1,options:[],callback:'orderBy'},
						{field:'sex',width:'8%',caption:'Sex',filter:2,options:['All','Mascle','Female'],callback:'orderBy'},
						{field:'age',width:'8%',caption:'Age',filter:2,options:['All',28,36,37,'Custom'],callback:'orderBy'},
						{field:'offer',width:'10%',caption:'Offer',filter:2,options:['All','Free','Trial','Pay'],callback:'orderBy'},
						{field:'offerExpirationDate',width:'12%',caption:'Expiration',filter:2,options:['All','Today','This week','This month','This year','Last week','Last month','Last year','Custom'],callback:'orderBy'},
						{field:'',width:'16%',caption:'Actions',filter:0,options:[],callback:''}
					   ],
				extraButtons:[{caption:"Send notification",icon:"fa fa-bell",icon2:"glyphicon glyphicon-bell",class1:"btn btn-warning pull-right",class2:"btn btn-warning btn-sm",disabled:"!statusSelect",callback:""},
							  {caption:"Send email",icon:"fa fa-envelope-o",icon2:"glyphicon glyphicon-envelope",class1:"btn btn-success pull-right",class2:"btn btn-success btn-sm",disabled:"!statusSelect",callback:""}
				]
			}
	};
	//Objeto maestro Final
	$scope.clickTitle=function(callback,field){
		switch(callback){
			case "selectAll":
				$scope.statusSelect=!$scope.statusSelect;
				for (var i=0;i<$scope.object.$data.length;i++){
					$scope.object.$data[i].select=$scope.statusSelect;
				}
				break;
			case "orderBy":
				$scope.object.tableParams.sorting.field=field;
				$scope.object.tableParams.sorting.direction=$scope.object.tableParams.sorting.direction=="Asc"?"Desc":"Asc";
				break;
		}
	};
	$scope.selectOne=function(state){
		if(state){
			if(!$scope.statusSelect){
				$scope.statusSelect=true;
			}
		}else{
			if($scope.statusSelect){
				var enc=false;
				for (var i=0;i<$scope.object.$data.length;i++){
					if($scope.object.$data[i].select){
						enc=true;
						break;
					}
				}
				$scope.statusSelect=enc;
			}
		}
	};
	$scope.clearSorting=function(){
		$scope.object.tableParams.sorting.field="";
		$scope.object.tableParams.sorting.direction="";
	};
	$scope.clearFilter=function(){
		$scope.object.tableParams.filter.field="";
		$scope.object.tableParams.filter.operator="";
		$scope.object.tableParams.filter.value="";
	};
	$scope.changeLanguage=function(lang){
		alert(lang);
	};
})
 .controller("mailingController",function($scope,pageService){	
	pageService.selected=6;
 })
 .controller("adminsController",function($scope,pageService){
	pageService.selected=7;
 })
.controller("settingsController",function($scope,pageService,$rootScope){
	$scope.model='menu';
	pageService.selected=$rootScope.configuration.options.length + 2;
});