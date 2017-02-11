/**
 * Created by chiusin on 2017/2/10.
 */
angular.module('todoApp.todoCtrl', ['todoApp.todoServ', 'ngRoute'])
	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/:status?', {
			templateUrl: 'todoView.html',
			controller: 'todoCtrl'
		}).otherwise({
				redirectTo: '/'
			})
	}])
	.controller('todoCtrl', ['$scope', '$location', '$todoServ', '$routeParams', function ($scope, $location, $todoServ, $routeParams) {
		// 1.第一个 列表显示功能 列表的数据
		$scope.todoList = $todoServ.getData()

		//暴露一个属性绑定到input上 当提交的时候就直接获取这个属性的值==input的value
		$scope.addName = '';
		//添加方式
		$scope.add = function () {
			//将当前文本框的值作为一个对象添加到数组中
			// console.log($scope.addName);
			if ($scope.addName == "") {
				return;
			}
			$todoServ.add($scope.addName)
			$scope.addName = '';
		};
		//实现 删除功能  删除哪一条数据 你点击删除那一行的id对应的对象删除掉
		$scope.remove = function (removeId) {
			$todoServ.remove(this.$index)
		};
		$scope.isSelectAll = false;
		//实现全选 和取消全选
		$scope.selectAll = function () {
			$todoServ.selectAll($scope.isSelectAll)

		};
		//实现记录已完成数量 就是复选框选中的列表的数量
		$scope.count = 0;
		$scope.$watch('todoList', function (newValue, oldValue) {
			$scope.count = 0;
			for (var i = 0; i < $scope.todoList.length; i++) {
				if ($scope.todoList[i].isCompleted == true) {
					$scope.count++;
				}
			}
		}, true);


		//清空所有已完成方法
		$scope.clear = function () {

			$todoServ.clear()
		};
		//因为只要显示当前点击对应的编辑框 所以这个属性给当前的对象加
		// $scope.isUpdate = false;
		$scope.update = function () {
			//在设置当前编辑之前 把所有对象的isUpdate的属性都设置为false
			for (var i = 0; i < $scope.todoList.length; i++) {
				$scope.todoList[i].isUpdate = false;
			}
			this.value.isUpdate = true;
		}
		//实现编辑完成后保存修改
		$scope.save = function () {
			//把输入框隐藏
			this.value.isUpdate = false;
		};


		$scope.status = {
			isCompleted: ''
		};


		switch ($routeParams.status) {
			case undefined:
				//根据不同情况修改筛选条件的值
				$scope.status = {
					isCompleted: ''
				};
				console.log($scope.status);
				$scope.isSelected = 'all';

				break;
			case 'active':
				$scope.status = {
					isCompleted: false
				};
				$scope.isSelected = 'active';

				break;
			case 'completed':
				$scope.status = {
					isCompleted: true
				};
				$scope.isSelected = 'completed';

				break;
		}


		//存储功能
		$scope.$watch('todoList', function (newValue) {
			$todoServ.setData()
		}, true)


	}]);
