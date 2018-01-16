; (function () {
    'use strict';

    var $add_task = $('.task-input')
        , task_list = [];

    init();
    // 初始化 读取store中的数据
    function init() {
        task_list = store.get('task_list') || [];
        console.log(task_list);
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
        refresh_task_list();
    }
    /*
    * 刷新localStorage数据并渲染模板
    * */
    function refresh_task_list() {
        store.set('task_list', task_list);
        // render_task_list();
    }
    /*
    * 渲染所有Task模板
    * */
    function render_task_list(type) {
        var $task_list = $('.todo-list');
        $task_list.html('');
        var complete_items = []; // 已完成
        var unComplete_items = []; // 未完成
        task_list.forEach(function(item, index){
            if (item.complete)
                complete_items.push(item);
            else
                unComplete_items.push(item);
        })
        for (var j = 0; j < task_list.length; j++) {
            var $task = render_task_item(task_list[j]);
            if (!$task) continue;
            $task_list.append($task);
        }
    }
    /*
    *渲染单条Task模板
    * */
    function render_task_item(data) {
        if (!data) return;
        var list_item_tpl =
            `<li class="todo">
            <input type="checkbox" class="toggle ${data.complete ? 'completed' : ''}">
            <label class="${data.complete ? 'completed' : ''}">${data.content}</label>
            <span class="fr">
                <span class="action delete"> 删除</span>
                <span class="action detail"> 详细</span>
            </span>
         </li>`
        return $(list_item_tpl);
    }
})();