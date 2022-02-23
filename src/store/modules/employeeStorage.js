import employeeManager from "@/api/Entity/EmployeeManager.js";

export default {
    state: {
        employees: [],
        recentEmployees: []
    },
    getters: {
        getEmployees: state => state.employees,
        getRecentEmployees: state => state.recentEmployees,
    },
    mutations: {
        setEmployees: (state, employees) => state.employees = employees,
        pushEmployee: (state, employee) => {
            state.employees.push(employee)
            state.recentEmployees.push(employee);
        },
        removeEmployeeById: (state, id) => {
            const employees = []
            const recentEmployees = []

            state.employees.forEach((item) => {
                if (+item.id !== +id) {
                    employees.push(item);
                }
            })

            state.recentEmployees.forEach((item) => {
                if (+item.id !== +id) {
                    recentEmployees.push(item);
                }
            })

            state.employees = employees;
            state.recentEmployees = recentEmployees;
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
            return await employeeManager.create(data).then(newEmployee => {
                dispatch('addEmployee', newEmployee)
                return newEmployee
            })
        },
        async getEmployeeById(store, id) {
            return await employeeManager.getById(id)
        },
        async deleteEmployeeById({commit}, id) {
            return await employeeManager.removeById(id).then(() => {
                commit('removeEmployeeById', id);
                return id;
            })
        },
    },
    namespaced: true
}
