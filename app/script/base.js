; (function () {
    'use strict';

    var $add_task = $('.task-input')
        , task_list = [];

    init();
    // 初始化 读取store中的数据
    function init() {
        task_list = store.get('task_list') || [];
        // listen_msg_event();
        if (task_list.length)
            render_task_list();
        // task_remind_check();
    }
    // 添加任务 input注册事件 keyup
    $add_task.keyup(function (e) {
        // 禁用默认行为
        e.preventDefault();
        // 按回车的时候触发
        if (e.keyCode === 13) {
            // 输入的内容不为空
            if (e.target.value.length) {
                // 对象形式存储 属性content为新Task
                var new_task = {};
                new_task.content = $(this).val();
                // 存入新Task
                add_task(new_task);
                // 当前inout清空
                $(this).val(null);
            } else { // 输入内容为空提示

            }
        }
    });
    /*
    * 添加Task
    * */
    function add_task(new_task) {
        // 将新Task推入task_list
        task_list.push(new_task);
        // 更新localStorage
        store.set('task_list', task_list);
        render_task_list();
    }
    /*
    * 渲染所有Task模板
    * */
    function render_task_list(type = 'all') {
        var $task_list = $('.todo-list');
        $task_list.html('');
        var complete_items = []; // 已完成
        var unComplete_items = []; // 未完成
        task_list.forEach(function (item, index) {
            if (item.complete)
                complete_items.push(item);
            else
                unComplete_items.push(item);
        })
        var data = task_list;
        if(type === 'all'){
            data = task_list
        }
        else if(type === 'completed'){
            data = complete_items
        }
        else if(type === 'unCompleted'){
            data = unComplete_items
        }
        for (var j = 0; j < data.length; j++) {
            var $task = render_task_item(data[j], j);
            if (!$task) continue;
            $task_list.append($task);
        }
        listen_checkbox_complete(task_list);
        listen_task_delete(task_list);
    }
    /*
    *渲染单条Task模板
    * */
    function render_task_item(data, index) {
        if (!data) return;
        var list_item_tpl =
            `<li class="todo ${data.complete ? 'completed' : ''}">
                <input type="checkbox" class="toggle" data-index=${index} ${data.complete ? 'checked' : ''}>
                <label>${data.content}</label>
                <span class="fr">
                    <span class="action delete"> 删除</span>
                    <span class="action detail"> 详细</span>
                </span>
            </li>`;
        return $(list_item_tpl);
    }
    // checkbox Task完成切换
    function listen_checkbox_complete(data) {
        $('.toggle').click(function () {
            data[$(this).data('index')].complete = !data[$(this).data('index')].complete;
            store.set('task_list', task_list);
            $(this).parent().toggleClass("completed");
        });
    }
    // 删除Task
    function listen_task_delete(data) {
        $('.delete').click(function () {
            data.splice($(this).parent().siblings('.toggle').data('index'), 1)
            store.set('task_list', task_list);
            render_task_list();
        });
    }
    listen_nav();
    // 导航切换
    function listen_nav() {
        $('.nav').click(function(e){
            if($(this).hasClass('all')){
                render_task_list();
            }
            else if($(this).hasClass('completed')){
                render_task_list('completed');
            }
            else if($(this).hasClass('unCompleted')){
                render_task_list('unCompleted');
            }

        });
    }
})();