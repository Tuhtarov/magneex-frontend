import employeeManager from "@/api/Entity/EmployeeManager.js";

const removeElement = (array, id) => array.reduce((p, c) => {
    c.id !== id && p.push(c)
    return p;
}, []);

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

        editEmployeeById: (state, {id, employee}) => {
            state.employees = state.employees.reduce((p, c) => {
                if (c.id === id) {
                    c = employee;
                }
                p.push(c);
                return p;
            }, [])
        },

        removeEmployeeById: (state, id) => {
            state.employees = removeElement(state.employees, id);
            state.recentEmployees = removeElement(state.recentEmployees, id);
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

        async editEmployee({commit}, {id, data}) {
            return await employeeManager.edit(id, data).then(employee => {
                commit('editEmployeeById', {id, employee})
                return employee
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
