import BigNumber from "bignumber.js"
import React from "react"
import bets from "../src/pages/bets"
import welcome from "../src/pages/index"

const converGWeiToEth = (wei: string) => {
    return (new BigNumber(wei).div('1000000000')).toString()
}

const getReadableDate = (unixDate: string) => {
    let date = new Date(Number(unixDate) * 1000)
    
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
}

const convertDateToUnix = (date: string): string => {
    return (Math.floor(Number(new Date(date)) / 1000)).toString()
}

const getDaysAndHoursFromUnix = (unixTime: string) => {
    const numberDays = Math.floor((Number(unixTime) / 3600) / 24)
    const numberHours = (Number(unixTime) / 3600) % 24

    if (numberDays == 1) {
        return `${numberDays} day and ${numberHours} hours`
    }

    else {
        return `${numberDays} days and ${numberHours} hours`
    }
}

const getTwoDecimalPercent = (cuantity: number, total: string) => {
    if (Number(total) > 0) {
        return Math.round((cuantity / Number(total)) * 10000) / 100
    }

    else {
        return 'N/A'
    }
}

const getCurrentTimeUnix = () => {
    return Math.floor(Date.now() / 1000)
}

let removeElementWhenClickOutside = (
    targetElement: HTMLElement, 
    elementToCheck: HTMLElement, 
    actionToPerformWhenClickOutside: () => void
): void => {

    while (elementToCheck) {
        if (targetElement == elementToCheck) {
            document.querySelector('html').addEventListener('click', ev => {
                if (ev.target instanceof HTMLElement) {
                    removeElementWhenClickOutside(targetElement, ev.target, actionToPerformWhenClickOutside)
                }
            }, {once: true})

            return 
        }

        elementToCheck = elementToCheck.parentElement
    }

    actionToPerformWhenClickOutside()
}

let splitPascalCase = (str: string) => {
    let arraySeparatedWords = str.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/([A-Z])([A-Z][a-z])/g, '$1 $2').replace(/([a-z])([A-Z])/g, '$1 $2').split(' ')

    return arraySeparatedWords.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
}

let getComponentName = (component: React.FunctionComponent) => {
    switch (component) {
        case bets:
            return 'Bets'
        case welcome:
            return 'contraqtual'
        default:
            return 'N/A'
    }
}

export {
    converGWeiToEth,
    convertDateToUnix,
    getCurrentTimeUnix,
    getReadableDate,
    getDaysAndHoursFromUnix,
    getTwoDecimalPercent,
    splitPascalCase,
    getComponentName
}