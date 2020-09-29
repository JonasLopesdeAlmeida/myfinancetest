import React from 'react'
import currencyFormatter from 'currency-formatter'

export default props => {
    //transformando um array de linhas de uma tabela.
    const rows = props.lancamentos.map(lancamento => {
        return (
            <tr key={lancamento.id}>
                <td>{lancamento.descricao}</td>
                <td>{currencyFormatter.format(lancamento.valor, { locale: 'en_GB' })}</td>
                <td>{lancamento.tipo}</td>
                <td>{lancamento.mes}</td>
                <td>{lancamento.status}</td>
                <td>
                    
                    <button className="btn btn-success" title="Confirm" disabled={lancamento.status !== 'PENDING'} onClick={e => props.alterarStatus(lancamento, 'CONFIRMED')} type="button">
                    <i className="pi pi-check"></i>
                    </button>

                    <button className="btn btn-danger" title="Cancel" disabled={lancamento.status !== 'PENDING'} onClick={e => props.alterarStatus(lancamento, 'CANCELED')} type="button">
                    <i className="pi pi-times"></i>
                    </button>

                    <button type="button" className="btn btn-primary" title="Edit" onClick={ e => props.editAction(lancamento.id)}><i className="pi pi-pencil"></i></button>
                    <button type="button" className="btn btn-danger" title="Delete" onClick={ e => props.deleteAction(lancamento)}><i className="pi pi-trash"></i></button>
                </td>
            </tr>
        )
    })

    return (

        <table className="table table-hover">

            <thead>
                <tr>
                    <th scope="col">Description</th>
                    <th scope="col">Value</th>
                    <th scope="col">Release type</th>
                    <th scope="col">Month</th>
                    <th scope="col">Situation</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>

            <tbody>
                {rows}

            </tbody>
        </table>
    )
}