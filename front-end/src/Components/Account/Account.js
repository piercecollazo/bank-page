import React, { Component } from 'react'
import { connect } from 'react-redux'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {getTransactions, changeCredit, addTransaction} from '../../redux/actions/authAction';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import Slider from '@material-ui/core/Slider';
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';

class Account extends Component {
    state = {
        creditScore: 0,
        business: '',
        cashAmount: 0,
        submittedCredit: false,
        submittedTransaction: false,
        balance: 0
    }
    componentDidMount(){
        if(!this.props.authUser.isAuthenticated){
            this.props.history.push('/')
        } else {
            this.setState({
                creditScore: this.props.authUser.user.creditScore,
                balance: this.props.authUser.user.balance
            })
            this.props.getTransactions(this.props.authUser.user.id)
        }

    }

    
    handleSliderChange = (event, newValue)=>{
        this.setState({
            creditScore: newValue
        })
    }

    creditSubmit = (event)=>{
        event.preventDefault()
        // This toggles the credit submission button's text
        this.setState({
            submittedCredit:true
        }, ()=>{setTimeout(() => {
            this.setState({
                submittedCredit:false
            })
        }, 5000)})
        
        this.props.changeCredit(this.props.authUser.user.id, this.state.creditScore)
            .then(()=>{
                this.setState({
                    creditScore: this.props.authUser.user.creditScore
                })
                console.log(`User's new credit: ${this.props.authUser.user.creditScore}`)
            })
            .catch(error => {
                console.log(error)
            })
    }

    handleTransactionChange = (event)=>{
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    transactionSubmit = (event)=>{
        event.preventDefault()
        this.setState({
            submittedTransaction:true
        }, ()=>{setTimeout(() => {
            this.setState({
                submittedTransaction:false
            })
        }, 5000)})
        this.props.addTransaction(this.props.authUser.user.id,this.state.business,this.state.cashAmount)
            .then(()=>{
                let cashNum = Number(this.state.cashAmount)
                let balanceNum = Number(this.state.balance)
                let newBalance = balanceNum += cashNum
                console.log(`newBalance: ${newBalance}`)
                this.setState({
                    balance: newBalance
                })

                this.setState({
                    business: '',
                    cashAmount: 0
                })
            })
    }


    render() {
        return (
            <div>
                {/* User account info */}
                <Grid container direction="row" spacing={1}>
                    <Grid item xs={8}>
                        <Paper style={{width: '100%'}}>
                            <Grid container direction="row" justify="center" spacing={2}>
                                <Grid item xs={4}>
                                    <h4>Account</h4>
                                    {this.props.authUser.user.name}
                                </Grid>

                                <Grid item xs={4}>
                                    <h4>Current Balance</h4>
                                    {`$${this.state.balance}`}
                                </Grid>

                                <Grid item xs={4}>
                                    <h4>Account #</h4>
                                    {this.props.authUser.user.accountNumber}
                                </Grid>

                                <Grid item xs={1}>
                                    <InfoOutlinedIcon />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    <Grid item xs={2}>
                    <Card style={{width:'70%', height: 'auto'}}>
                    <CardContent>
                        <h3 >Your credit score</h3>
                        <CircularProgressbar value={this.state.creditScore} maxValue={850} text={`${this.state.creditScore}`} />
                        <br />

                        {/* Credit score slider */}
                        <Slider
                          defaultValue={this.props.authUser.user.creditScore}
                          max={850}
                          min={0}
                          valueLabelDisplay="auto"
                          onChange={this.handleSliderChange}
                          aria-labelledby="input-slider"
                        />
                    </CardContent>
                    <CardActions>
                        <Button variant='contained' color='primary' onClick={this.creditSubmit} >
                            {this.state.submitted ? 'Submitted!' : 'Update'}
                        </Button>
                        <InfoOutlinedIcon />
                    </CardActions>
                    </Card>
                    </Grid>

                    {/* transaction adder */}
                    <Grid item xs>
                        <Card>
                            <CardContent>
                                <h3>Add Transaction</h3>
                                <TextField 
                                    placeholder='Business'
                                    name='business'
                                    onChange={this.handleTransactionChange}
                                />

                                <TextField 
                                    placeholder='$'
                                    name='cashAmount'
                                    onChange={this.handleTransactionChange}
                                />
                            </CardContent>

                            <CardActions>
                                <Button variant='contained' color='primary' onClick={this.transactionSubmit} >
                                {this.state.submitted ? 'Submitted!' : 'Update'}
                                </Button>

                                <InfoOutlinedIcon />
                            </CardActions>
                        </Card>
                    </Grid>

                </Grid>
                <br />
                {/* Transaction list */}
                <Paper style={{width: '70%', overflowX: 'auto'}}>
                    <Table style={{minWidth: 650}} aria-label='Transactions'>
                        <TableHead>
                            <TableRow>
                                <TableCell><h4>Business</h4></TableCell>
                                <TableCell><h4>Amount</h4></TableCell>
                                <TableCell><h4>Date</h4></TableCell>
                                <TableCell><InfoOutlinedIcon/></TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {this.props.authUser.transactions.map(item =>(
                                <TableRow key={item._id}>
                                    <TableCell>{item.business}</TableCell>
                                    <TableCell>{`$${item.cashAmount}`}</TableCell>
                                    <TableCell>{item.timestamp}</TableCell>
                                </TableRow>
                            )).reverse()}
                        </TableBody>

                    </Table>
                </Paper>
                <br />
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default connect(mapStateToProps, {getTransactions, changeCredit, addTransaction})(Account);