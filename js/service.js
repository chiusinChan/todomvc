/**
 * Created by chiusin on 2017/2/10.
 */
angular.module('todoApp.todoServ',[])
	.service('$todoServ',function () {
			var todoList = JSON.parse(window.localStorage.getItem('todoList')) || [];
		this.getData=function () {
                 return todoList
		};
		this.add=function (addName) {
			todoList.push({
				id: Math.random(),
				isCompleted: false,
				name: addName,
				isUpdate: false
			});

		}
		this.remove=function (index) {
			todoList.splice(index, 1);

		}
		this.selectAll=function (isSelectAll) {
			for (var i = 0; i < todoList.length; i++) {
				todoList[i].isCompleted = isSelectAll;
			}
		}
		this.clear=function () {
			for (var i = 0; i < todoList.length; i++) {
				if (todoList[i].isCompleted == true) {
					todoList.splice(i, 1);
					i--;
				}
			}
		}
		this.setData=function () {
			window.localStorage.setItem('todoList',JSON.stringify(todoList))

		}
	})
