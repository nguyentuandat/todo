(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
$(document).ready(function(){
    
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyAwFzsU8FqxKw5Cqz2U9Yb9dMYG2D2maT0",
        authDomain: "todo-abaf6.firebaseapp.com",
        databaseURL: "https://todo-abaf6.firebaseio.com",
        storageBucket: "todo-abaf6.appspot.com",
    };
    firebase.initializeApp(config);
    var todo = new TodoApp(firebase);
    todo.init();
    todo.getList();
    todo.events();
    
})
var TodoApp = function(firebase){
    var btnSave = $('#btnSave');
    var input = $('#txtNewTask');
    var todoList = $('#todoList');
    
    return {
        init: function(){
        
        },
        events: function(){
            btnSave.on('click', function(e){
                console.log(input.val());
                var newTodoKey = firebase.database().ref().child('todo').push().key;
                var updates = {};
                updates['/todo/' + newTodoKey] = {title: input.val()};

                firebase.database().ref().update(updates);
                TodoApp.render(newTodoKey, input.val());
            })
        },
        getList: function(){
            firebase.database().ref('todo').on('value', function(snapshot){
                var items = snapshot.val();
                var html = '';
                items.each(item, function(key){
                    html += '<li id="'+key+'">'+item.title+'</li>'
                });
                todoList.empty().append(html);
            });
            
        },
        render: function(key, val){
            todoList.append('<li id="'+key+'">'+val+'</li>');
        }
    }
}
},{}]},{},[1]);
