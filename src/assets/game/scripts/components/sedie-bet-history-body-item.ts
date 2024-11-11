import gc from "@sg/game-client-base";
import { _decorator, instantiate, Label, Node, Prefab } from "cc";
import { BetHistoryNewBodyItem } from "db://shared-components/game/bet-history-new/scripts/bet-history-new-body-item";
import { BetHistoryBodyItemType } from "db://shared-components/game/bet-history/scripts/components/bet-history-body-item";
import SeDieBetHistoryBetOption from "./sedie-bet-history-bet-option";
const { ccclass, property } = _decorator;

export type SeDieBetItemType = {
    red2: number;
    red3: number;
    red4: number;
    white3: number;
    white4: number;
    even: number;
    odd: number;
};

export type SeDieBetHistoryBodyItemType = BetHistoryBodyItemType & {
    betsPrefab: Prefab | null;
};

const { DateTimeUtils, FormatUtils } = gc;

@ccclass
export class SeDieBetHistoryNewBodyItem extends BetHistoryNewBodyItem {
    @property(Label)
    lblHour: Label = null;

    @property(Label)
    lblDate: Label = null;

    @property(Node)
    betOption: Node = null;

    setData(data: SeDieBetHistoryBodyItemType) {
        super.setData(data);
        const { betsPrefab } = data;

        const betData: SeDieBetItemType = data.betHistoryLog as any;
        const { time, settlementResult, freeBet, odds } = data.betHistoryLog;
        if (time) {
            const date = DateTimeUtils.getStringDate(time);
            const hour = DateTimeUtils.getStringHourByTime(time);
            this.lblDate.string = date;
            this.lblHour.string = hour;

            console.log("date-hour: ", date, hour);
        }

        if (settlementResult) {
            Object.keys(settlementResult).forEach((choice) => {
                const node = instantiate(betsPrefab);
                const option = node.getComponent(SeDieBetHistoryBetOption);
                let stake = data.betHistoryLog[choice];
                if (+stake > 0) {
                    stake = freeBet ? 0 : stake;
                    option.handleBetOptionItem(choice, FormatUtils.numberWithCommas(odds[choice], 2), FormatUtils.numberWithCommas(stake));
                    option.highlightForWinning(settlementResult[choice]);
                    this.betOption.addChild(node);
                }
            });
        }
    }
}
