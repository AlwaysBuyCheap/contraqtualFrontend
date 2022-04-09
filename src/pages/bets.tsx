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
        <div style={betsStyle}>
            <div style={{display: "flex", justifyContent: "flex-end"}}>
                <Button
                    style={{marginTop: "20px", marginRight: "20px"}}
                    variant="primary"
                    size="lg"
                    onClick={() => setCreateBetDisplayed(true)} active
                >Create bet</Button>
            </div>

            <BetsList/>

            <CreateBetWindow createBetDisplayed={createBetDisplayed} setCreateBetDisplayed={setCreateBetDisplayed} />
        </div>
    )
}

const betsStyle: React.CSSProperties = {
    display: "flex",
    flexDirection: "column"
}

export default Bets

export type {
    IPollsState
}

