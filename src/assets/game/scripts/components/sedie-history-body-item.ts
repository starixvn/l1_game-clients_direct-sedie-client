import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { BetHistoryNewBodyItem } from "../../../../extensions/shared-components/assets/game/bet-history-new/scripts/bet-history-new-body-item";
import { BetHistoryBodyItemType } from "../../../../extensions/shared-components/assets/game/bet-history/scripts/components/bet-history-body-item";
const { ccclass } = _decorator;

export type SedieBetItemType = {
    red2: number;
    red3: number;
    red4: number;
    white3: number;
    white4: number;
    even: number;
    odd: number;
};

@ccclass
export class SedieBetHistoryNewBodyItem extends BetHistoryNewBodyItem {
    setData(data: BetHistoryBodyItemType) {
        super.setData(data);

        const betData: SedieBetItemType = data.betHistoryLog as any;
        const totalStake = betData.red2 + betData.red3 + betData.red4 + betData.white3 + betData.white4 + betData.even + betData.odd;
        this.lblTotalStake.string = gc.FormatUtils.numberWithCommas(totalStake, 2);
    }
}
