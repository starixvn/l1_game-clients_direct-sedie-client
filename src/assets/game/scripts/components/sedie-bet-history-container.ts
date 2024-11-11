import gc from "@sg/game-client-base";
import { Prefab, _decorator } from "cc";
import BetHistoryContainer from "db://shared-components/game/bet-history/scripts/components/bet-history-container";
import Observer from "observer";
import { SeDieBetHistoryTable } from "./sedie-bet-history-table";

const { ccclass, property } = _decorator;
const { render } = Observer;
const { BetHistory } = gc;

@ccclass("SeDieBetHistoryContainer")
export default class SeDieBetHistoryContainer extends BetHistoryContainer {
    @property(Prefab)
    betPrefab: Prefab = null;

    @render(BetHistory.BetHistoryStore, (store) => store.betHistoryModel, { fireImmediately: false })
    showBetHistory(betHistoryModel: gc.BetHistory.BetHistoryModel) {
        if (!this.wrapperNode?.active) {
            this.wrapperNode = this.createNode();
            this.table = this.wrapperNode.getComponent(SeDieBetHistoryTable);
        }

        (this.table as SeDieBetHistoryTable).showBetHistory({
            data: betHistoryModel,
            headerPrefab: this.headerPrefab,
            bodyItemPrefab: this.bodyItemPrefab,
            resultPrefab: this.resultPrefab,
            betsPrefab: this.betPrefab,
        });
    }
}
