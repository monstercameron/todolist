/**
 * TODOLIST features:
 * add todo
 * * title
 * * submission time
 * * message/body
 * store todo db?
 * update todo
 * delete todo
 * set todo as completed
 * filter todo
 * color todo
 * todo groups
 */

 
const state = {}
const demoGroup = ['demo', 'demo2']
const demoTodo = [{ group: 'demo', title: 'demo title', date: new Date().toUTCString(), details: 'demo details', checked: true }]
const getGroups = () => localStorage.getItem('groups')
const insertDemoGroup = () => localStorage.setItem('groups', JSON.stringify(demoGroup))
const insertGroupsAsOptions = (target, groups) => {
    target.innerHTML = groups.map(element => `<option value="${element}">${element}</option>`);
}

const getTodos = () => localStorage.getItem('todos')
const insertDemoTodo = () => localStorage.setItem('todos', JSON.stringify(demoTodo))
const insertTodosInContainer = (target, todos, group) => {
    target.innerHTML = todos
    .filter((elem) => elem.group === group)
    .map((elem) => {
        console.log(elem);
        return `<div class="todo">
    <div class="title">${elem.title}</div>
    <div class="date">${elem.date}</div>
    <div class="checked"><input type="checkbox" ${elem.checked ? 'checked' : ''}></div>
</div>`})
}

const listenForGroupSelection = (e) => {
    Object.assign(state, { selectedGroup: e.target.value })
    insertTodosInContainer(state.todosContainer,state.todos, state.selectedGroup)

}

const init = () => {
    let loadGroups = getGroups()
    if (!loadGroups) {
        insertDemoGroup()
        loadGroups = getGroups()
    }

    let todos = getTodos()
    if (!todos) {
        insertDemoTodo()
        todos = getTodos()
    }
    Object.assign(state, { groups: JSON.parse(loadGroups), todos: JSON.parse(todos) })
    console.log(state);

    const selectGroups = document.querySelector('#todoGroupSelect')
    console.log(selectGroups);
    insertGroupsAsOptions(selectGroups, state.groups)

    const todosContainer = document.querySelector('#todoContainerList')
    Object.assign(state, {todosContainer})

    selectGroups.addEventListener('change', listenForGroupSelection)
}

init()