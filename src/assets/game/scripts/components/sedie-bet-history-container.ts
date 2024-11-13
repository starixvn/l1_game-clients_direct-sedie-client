import gc from "@sg/game-client-base";
import { Prefab, _decorator } from "cc";
import BetHistoryContainer from "db://shared-components/game/bet-history/scripts/components/bet-history-container";
import { SeDieBetHistoryTable } from "./sedie-bet-history-table";

const { ccclass, property } = _decorator;

@ccclass
export default class SeDieBetHistoryContainer extends BetHistoryContainer {
    @property(Prefab)
    betPrefab: Prefab = null;

    DURATION_DELAY_RENDER_DATA = 0.1;
    currentBetHistoryModel: gc.BetHistory.BetHistoryModel = null;

    showBetHistory(betHistoryModel: gc.BetHistory.BetHistoryModel) {
        this.currentBetHistoryModel = betHistoryModel;
        if (!this.wrapperNode?.active) {
            this.wrapperNode = this.createNode();
            this.table = this.wrapperNode.getComponent(SeDieBetHistoryTable);
        }

        const seDieTable = this.table as SeDieBetHistoryTable;
        seDieTable.dialog &&
            (seDieTable.dialog.callBackFn = () => {
                if (!betHistoryModel) {
                    this.scheduleOnce(seDieTable.dialog.callBackFn, this.DURATION_DELAY_RENDER_DATA);
                    return;
                }
                (this.table as SeDieBetHistoryTable).showBetHistory({
                    data: this.currentBetHistoryModel,
                    headerPrefab: this.headerPrefab,
                    bodyItemPrefab: this.bodyItemPrefab,
                    resultPrefab: this.resultPrefab,
                    betsPrefab: this.betPrefab,
                });
            });
    }
}
