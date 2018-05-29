var listaFuncs = () => {
    axios.get('http://localhost:3000/employees')
        .then(function (response) {
            listagem.funcionarios = response.data
        })
}

var form = new Vue({
    el: '#form',
    data: {
        fid: null,
        fnome: null,
        fsalario: null,
        fidade: null
    },
    methods: {
        salvar: function () {
            salvaFunc(fid.value, fnome.value, fsalario.value, fidade.value)
        }
    }
})

var listagem = new Vue({
    el: '#listagem',
    data: {
        funcionarios: null,
        funcionarioSel: null
    },
    methods: {
        excluir: function (id) {
            deletaFunc(id)
        },
        alterar: function (id) {
            alteraFunc(id)
        }
    }
})

var salvaFunc = (sid, snome, ssalario, sidade) => {

    if (sid && sid > 0) {
        axios.put('http://localhost:3000/employees', {
            employee_name: snome,
            employee_salary: ssalario,
            employee_age: sidade,
            id: sid
        }).then(function (response) {
            listaFuncs()
        }).catch(function (error) {
            console.log(error);
        });
    } else {
        axios.post('http://localhost:3000/employees', {
            employee_name: snome,
            employee_salary: ssalario,
            employee_age: sidade
        }).then(function (response) {
            listaFuncs()
        }).catch(function (error) {
            console.log(error);
        });
    }
}

var deletaFunc = (sid) => {
    axios.delete('http://localhost:3000/employees/' + sid).then(function (response) {
        listaFuncs()
    }).catch(function (error) {
        console.log(error);
    });
}

var alteraFunc = (sid) => {
    axios.get('http://localhost:3000/employees/' + sid)
        .then(function (response) {
            form.fid = response.data[0].id
            form.fnome = response.data[0].employee_name
            form.fidade = response.data[0].employee_age
            form.fsalario = response.data[0].employee_salary
        })
}

listaFuncs()