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
        removeEmployeeById: (state, id) => {
            const employees = []

            state.employees.forEach((item) => {
                if (+item.id !== +id) {
                    employees.push(item);
                }
            })

            state.employees = employees;
        }
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
                .catch(e => Promise.reject(e));
        },
        async getEmployeeById(store, id) {
            return await employeeManager.getById(id)
                .then(r => Promise.resolve(r))
                .catch(e => Promise.reject(e));
        },
        async deleteEmployeeById({commit}, id) {
            return await employeeManager.removeById(id)
                .then(removedId => {
                    commit('removeEmployeeById', id);
                    return Promise.resolve(removedId);
                })
                .catch(e => Promise.reject(e));
        },
    },
    namespaced: true
}