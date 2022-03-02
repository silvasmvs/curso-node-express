const moment = require('moment');
const connection = require('../db/connection');
const conexao = require('../db/connection')

class Call {
    create(call, res) {
        const created = moment().format('YYYY-MM-DD HH:MM:SS');
        const date = moment(call.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const isValidDate = moment(date).isSameOrAfter(created);
        const isValidClient = call.client.length >= 5;

        const validations = [
            {
                name: 'data',
                valid: isValidDate,
                message: 'Data deve ser maior ou igual a data atual'
            },
            {
                name: 'cliente',
                valid: isValidClient,
                message: 'Cliente deve ter pelo menos cinco caracteres'
            }
        ]

        const errors = validations.filter(field => !field.valid)
        const hasErrors = errors.length

        if(hasErrors) {
            res.status(400).json(errors)
        } else {
            const callWidthDate = {...call, created, date}

            const sql = 'INSERT INTO calls SET ?'
    
            conexao.query(sql, callWidthDate, (error, result) => {
                if(error) {
                    res.status(400).json(error)
                } else {
                    res.status(201).json(call)
                }
            })
        }
       
    }

    get(res) {
        const sql = 'SELECT * FROM calls';

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results);
            }
        });
    }

    getById(id, res) {
        const sql = `SELECT * FROM calls WHERE id=${id}`;

        connection.query(sql, (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json(results[0]);
            }
        });
    }

    update(id, values, res) {

        if(values.date) {
            values.date = moment(values.date, 'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS')
        }  

        const sql = 'UPDATE calls SET ? WHERE id=?';

        connection.query(sql, [ values, id] ,  (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({ id, ...values});
            }
        });
    }

    delete(id, res) {
        const sql = 'DELETE FROM calls WHERE id=?';

        connection.query(sql, [id] ,  (error, results) => {
            if(error) {
                res.status(400).json(error);
            } else {
                res.status(200).json({id});
            }
        });
    }
}

module.exports = new Call