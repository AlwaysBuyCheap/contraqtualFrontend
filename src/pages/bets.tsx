import React from 'react'
import { IRootContextType, RootContext } from '../../components/GlobalComponents/screenerLayoutWrapper'
import { Button, Container, Row, Col } from 'react-bootstrap';
import CreateBetWindow from "../../components/BetsComponents/CreateBetWindow"
import BetsList from '../../components/BetsComponents/BetsList';

interface IPollsState {
    idSearched: string
    createPollWindowDisplayed: boolean
}

const Bets = (): React.ReactElement => {
    let rootContext: IRootContextType = React.useContext(RootContext)
    let [createBetDisplayed, setCreateBetDisplayed] = React.useState<boolean>(false)

    React.useEffect(() => {
        rootContext.setActivePage("bets")
    }, [])

    return (
        <>
            <Button
                style={{position: "absolute", marginTop: "15px", right: "25px"}}
                variant="primary"
                size="lg"
                onClick={() => setCreateBetDisplayed(true)} active
            >Create bet</Button>

            <BetsList/>

            <CreateBetWindow createBetDisplayed={createBetDisplayed} setCreateBetDisplayed={setCreateBetDisplayed} />
        </>
    )
}

export default Bets

export type {
    IPollsState
}

