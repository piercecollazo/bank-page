import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getTransactions} from '../../redux/actions/authAction';
import Grid from '@material-ui/core/Grid';

class Account extends Component {

    componentDidMount(){
        if(!this.props.authUser.isAuthenticated){
            this.props.history.push('/')
        } else {
            this.props.getTransactions(this.props.authUser.user.id)
        }

    }

    
    render() {
        return (
            <div>
                {/* User account info */}
                <Paper style={{width: '70%'}}>
                    <Grid container direction="row" justify="center" spacing={2}>
                        <Grid item xs={4}>
                            <h4>Account</h4>
                            {this.props.authUser.user.email}
                        </Grid>

                        <Grid item xs={4}>
                            <h4>Balance</h4>
                            {`$${this.props.authUser.user.balance}`}
                        </Grid>
                    </Grid>
                </Paper>
                <br />
                {/* Transaction list */}
                <Paper style={{width: '70%', overflowX: 'auto'}}>
                    <Table style={{minWidth: 650}} aria-label='Transactions'>
                        <TableHead>
                            <TableRow>
                                <TableCell><h4>Business</h4></TableCell>
                                <TableCell><h4>Amount</h4></TableCell>
                                <TableCell><h4>Date</h4></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.authUser.transactions.map(item =>(
                                <TableRow key={item._id}>
                                    <TableCell>{item.business}</TableCell>
                                    <TableCell>{`$${item.cashAmount}`}</TableCell>
                                    <TableCell>{item.timestamp}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>

                    </Table>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default connect(mapStateToProps, {getTransactions})(Account);