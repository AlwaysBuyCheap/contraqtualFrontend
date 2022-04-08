import React from "react"
import { Card, Container, Row, Col, Form, Button } from "react-bootstrap"
import { IBet } from "../../library/types"
import { betYes, betNo } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"

interface IBetElementProps {
    bet: IBet
}

const BetElement = (props: IBetElementProps): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)

    const YesInput = (): React.ReactElement => {
        const [yesVotes, setYesVotes] = React.useState<string>(null)

        return (
            <>
                <Col>{props.bet.yesVotes} votes</Col>

                <Col>
                    <Form.Control type="number" onChange={ev => setYesVotes(ev.target.value)}></Form.Control>
                </Col>

                <Col>
                    <Button 
                        variant="primary"
                        onClick={ev => {
                            betYes(
                                rootContext.web3ConnectionData.createBetInstance, 
                                rootContext.web3ConnectionData.account, 
                                props.bet.id,
                                yesVotes
                            )
                        }}
                    >Vote</Button>
                </Col>
            </>
        )
    }

    const NoVote = () => {
        const [noVotes, setNoVotes] = React.useState<string>(null)

        return(
            <>
                <Col>{props.bet.noVotes} votes</Col>

                <Col>
                    <Form.Control 
                        type="number" 
                        onChange={ev => {
                            setNoVotes(ev.target.value)
                        }}></Form.Control>
                </Col>

                <Col>
                    <Button 
                        variant="primary" 
                        onClick={ev => {
                            betNo(
                                rootContext.web3ConnectionData.createBetInstance, 
                                rootContext.web3ConnectionData.account, 
                                props.bet.id, 
                                noVotes
                            )
                        }}>Vote</Button>
                </Col>
            </>
        )
    }

    return (
        <Card key={props.bet.id} style={{marginTop: '20px'}}>
            <Card.Header as="h5">{props.bet.proposition}</Card.Header>
            <Card.Body>
                <Container fluid>
                    <Row>
                        <Col>Yes votes:</Col>
                        <YesInput />
                    </Row>

                    <Row style={{marginTop: '20px'}}>
                        <Col>No Votes</Col>
                        <NoVote />
                    </Row>
                </Container>
            </Card.Body>
        </Card>
    )
}

export default BetElement