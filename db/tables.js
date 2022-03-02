class Tables {
    init(connection) {
        this.connection = connection;

        this.newCalls();
    }

    newCalls() {
        const sql = `CREATE TABLE IF NOT EXISTS calls (id int NOT NULL
            AUTO_INCREMENT, client varchar(50) NOT NULL, pet varchar(20),
            service varchar(20) NOT NULL,date datetime NOT NULL, created datetime NOT NULL, status varchar(20) NOT NULL,
            observations text, PRIMARY KEY(id))`;

        this.connection.query(sql, erro => {
            if(erro) {
                console.log(erro)
            } else {
                console.log('Tabela Atendimentos criada com sucesso')
            }
        });
    }
};

module.exports = new Tables;