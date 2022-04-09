import React from "react"
import { IBet } from "../../library/types"
import { getBets } from "../../library/web3methods"
import { IRootContextType, RootContext } from "../GlobalComponents/screenerLayoutWrapper"
import BetElement from "./BetElement"
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
        <div style={{display: "flex", flexDirection: "column", alignItems: "center", width: "90%", marginLeft: "5%", marginBottom: "40px"}}>
            <List />
        </div>
    )
}

export default BetsList