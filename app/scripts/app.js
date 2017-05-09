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
				$rootScope.total=$rootScope.configuration.options.length + 2;
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
      .when('/:list/list', {
        templateUrl: 'views/bases/list.html',
        controller: 'crudController'
      })
	  .when('/:list/create',{
		templateUrl:'views/bases/form.html',
		controller:'crudController'
	  })	  
      .when('/schedualing', {
        templateUrl: 'views/schedualing.html',
        controller: 'schedualingController'
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
	  .when('/settings/menu/create',{
		  templateUrl:'views/settings/form.html',
		  controller:'settingsController'
	  })
	  .when('/settings/menu/update/:key',{
		  templateUrl:'views/settings/form.html',
		  controller:'settingsController'
	  })
	  .when('/settings/menu/data/:key',{
		  templateUrl:'views/settings/data.html',
		  controller:'settingsController'
	  })
	  .when('/settings/general_json',{
		  templateUrl:'views/settings/general_json.html',
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
	$scope.page=pageService;
 })
 .controller("dashboardController",function($scope,pageService){
	pageService.selected=1;
})
 .controller("crudController",function($scope,pageService,$routeParams,$rootScope){
	var c=$rootScope.configuration.options.length;
	for(var i=0;i<c;i++){
		if($rootScope.configuration.options[i].key==$routeParams.list)
			break;
	}	
	pageService.selected=i+2;
	var c=$rootScope.configuration.data.test.length;
	for(var i=0;i<c;i++){
		if($rootScope.configuration.data.test[i].key==$routeParams.list)
			break;
	}
	$scope.statusSelect=false;
	$scope.model=$routeParams.list;
	if($rootScope.configuration.env=='test'){
		$scope.object={
			$data:$rootScope.configuration.data.test[i].values,
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
				titles:$rootScope.configuration.fields[i].values,
				extraButtons:[]
			}
			
		};
	}else if($rootScope.configuration.env=="develop"){
		//Develop environment
	}else{
		//Production environment
	}
	/*
	if($scope.model=="programs"){
		pageService.selected=2;
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
	}else{
		pageService.selected=5;
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
	}
	*/
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
		var enc=true;
		for (var i=0;i<$scope.object.$data.length;i++){
			if(!$scope.object.$data[i].select){
				enc=false;
				break;
			}
		}
		$scope.statusSelect=enc;
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
 .controller("mailingController",function($scope,pageService){	
	pageService.selected=6;
 })
 .controller("adminsController",function($scope,pageService){
	pageService.selected=7;
 })
.controller("settingsController",function($scope,pageService,$rootScope,$routeParams){
	$scope.newOption={};
	$scope.newField={field:"",caption:"",type:"",width:0,filter:1,sort:1,edit:1,visible:1,option:{}};
	$scope.newDato={};
	$scope.model='menu';
	//$scope.clearOption();	
	pageService.selected=$rootScope.configuration.options.length + 2;
	$scope.edit=0;
	$scope.fields=[];
	$scope.datos=[];
	if($routeParams.key!=undefined){
		$scope.edit=1;
		var c=$rootScope.configuration.options.length;
		for(var i=0;i<c;i++){
			if($rootScope.configuration.options[i].key==$routeParams.key){
				$scope.newOption.key=$rootScope.configuration.options[i].key;
				$scope.newOption.index=$rootScope.configuration.options[i].index;
				$scope.newOption.target=$rootScope.configuration.options[i].target;
				$scope.newOption.caption=$rootScope.configuration.options[i].caption;
				$scope.newOption.type=$rootScope.configuration.options[i].type;
				$scope.newOption.icon=$rootScope.configuration.options[i].icon;
				break;
			}
		}
		var c=$rootScope.configuration.fields.length;
		for(var i=0;i<c;i++){
			if($rootScope.configuration.fields[i].key==$routeParams.key){
				$scope.fields=$rootScope.configuration.fields[i].values;
				break;
			}
		}
		var c=$rootScope.configuration.data.test.length;
		for(var i=0;i<c;i++){
			if($rootScope.configuration.data.test[i].key==$routeParams.key){
				$scope.datos=$rootScope.configuration.data.test[i].values;
				break;
			}
		}		
	}
	
	$scope.clearOption=function(){
		$scope.newOption={index:$rootScope.configuration.options.length + 2,
						  key:'',
						  target:'',
						  caption:'',
						  type:'',
						  icon:'fa fa-users',
		};
	};
	
	$scope.saveOption=function(){
		if($scope.newOption.type=='CRUD'){
			$scope.newOption.target=$scope.newOption.key + "/list";
		}		
		if($routeParams.key==undefined){
			$scope.newOption.index=$rootScope.configuration.options.length + 2;
			$rootScope.configuration.options.push($scope.newOption);
			$rootScope.configuration.fields.push({key:$scope.newOption.key,values:[]});
			$rootScope.configuration.data.test.push({key:$scope.newOption.key,values:[]});
			$rootScope.total++;
			pageService.selected=$rootScope.total;
			$scope.clearOption();
		}else{
			$rootScope.configuration.options[i].target=$scope.newOption.target;
			$rootScope.configuration.options[i].caption=$scope.newOption.caption;
			$rootScope.configuration.options[i].icon=$scope.newOption.icon;
			$rootScope.configuration.options[i].type=$scope.newOption.type;
		}
	};
	
	$scope.saveField=function(){
		$scope.fields.push($scope.newField);
		$scope.newField={field:"",caption:"",type:"",width:0,filter:1,sort:1,edit:1,visible:1,option:{}};
	};
	
	$scope.saveDato=function(){
		$scope.datos.push($scope.newDato);
	};
	
	$scope.del=function(opt){
		var c=$rootScope.configuration.options.length;
		for(var i=0;i<c;i++){
			if($rootScope.configuration.options[i].key==opt.key)
				break;
		}
		$rootScope.configuration.options.slice(i);
	};
});