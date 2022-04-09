import React from "react"
import { IBet } from "../../library/types"
import { getBets } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"
import BetElement from "./BetElement"
import { Stack } from "react-bootstrap"
import LoadingElement from "../GlobalComponents/loadingElement"

const BetsList = (): React.ReactElement => {
    const rootContext: IRootContextType = React.useContext(RootContext)
    const [bets, setBets] = React.useState<IBet[]>(null)

    React.useEffect(() => {
        if (rootContext.web3ConnectionData.createBetInstance) {
            getBets(rootContext.web3ConnectionData.createBetInstance)
                .then(bets => {
                    setBets(bets)
                })
        }
    }, [rootContext.web3ConnectionData.createBetInstance])

    const List = (): React.ReactElement => {
        if (rootContext.web3ConnectionData.createBetInstance) {
            if (bets) {
                const elements = bets.map((bet) => {
                    return (
                        <BetElement bet={bet} key={bet.id} />
                    )
                })
    
                return <>{elements}</>
            }
    
            return (
                <LoadingElement className={null}/>
            )
        }

        return <div>Connect your wallet</div>
    }

    return (
        <Stack className="col-md-5 mx-auto" style={{marginTop: "80px", maxWidth: '90%'}}>
            <List></List>
        </Stack>
    )
}

export default BetsList