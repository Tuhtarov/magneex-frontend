import employeeManager from "@/api/Entity/EmployeeManager.js";

export default {
    state: {
        employees: [],
        // здесь хранятся последний добавленный сотрудник
        // нужно для отображение недавно созданных сотрудников в форме создания
        recentEmployee: null
    },
    getters: {
        getEmployees: state => state.employees,
        getRecentEmployee: state => state.recentEmployee,
    },
    mutations: {
        setEmployees: (state, employees) => state.employees = employees,
        pushEmployee: (state, employee) => {
            state.employees.push(employee)
            state.recentEmployee = employee;
        },
    },
    actions: {
        async fetchEmployees({commit}) {
            return await employeeManager.fetchAll().then(employees => {
                commit('setEmployees', employees);
            });
        },
        addEmployee({commit}, employee) {
            commit('pushEmployee', employee);
        },
        async createEmployee({dispatch}, data) {
            return await employeeManager.create(data)
                .then(newEmployee => {
                    dispatch('addEmployee', newEmployee)
                    return Promise.resolve(newEmployee)
                })
        }
    },
    namespaced: true
}