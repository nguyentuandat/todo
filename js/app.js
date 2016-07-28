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
    
})
var TodoApp = function(firebase){
    var btnSave = $('#btnSave');
    var input = $('#txtNewTask');
    var todoList = $('#todoList');
    
    return {
        init: function(){
            btnSave.on('click', function(e){
                var newTodoKey = firebase.database().ref().child('todo').push().key;
                var updates = {};
                updates['/todo/' + newTodoKey] = {title: input.val()};

                firebase.database().ref().update(updates);
            });
        },
        events: function(){
            
            $('#todoList li span').on('click', document, function(){
                
                var status = '';
                if($(this).parent().hasClass('done')){
                    status = 'active';
                }
                else{
                    status = 'done';
                }
                  
                var id = $(this).parent().attr('id');
                var updates = {};
                updates['/todo/' + id+'/status'] = status;

                return firebase.database().ref().update(updates);
            });
            $('#todoList li .btn-delete').on('click', document, function(){
                
                var status = 'deleted';
                if($(this).parent().hasClass('deleted')){
                    status = 'active';
                }
                var id = $(this).parent().attr('id');
                var updates = {};
                updates['/todo/' + id+'/status'] = status;

                return firebase.database().ref().update(updates);
            });
        },
        getList: function(){
            var that = this;
            firebase.database().ref('todo').on('value', function(snapshot){
                var items = snapshot.val();
                that.render(items);
            });
            
        },
        render: function(items){
            var html = '';
            $.each(items, function(key, item){

                html += '<li class="'+item.status+'" id="'+key+'"><span>'+item.title+'</span> ';
                html += (item.status == 'deleted') ? '<a href="javascript:;" class="btn-delete pull-right">Undo</a></li>' : '<a href="javascript:;" class="btn-delete pull-right">Remove</a></li>';
            });
            todoList.empty().append(html);
            
            this.events();
        }
    }
}