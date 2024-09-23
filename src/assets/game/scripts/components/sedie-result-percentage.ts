import gc from "@sg/game-client-base";
import { _decorator } from "cc";
import { ResultPercentage } from "../../../../extensions/shared-components/assets/game/result-percentage/scripts/result-percentage";
const { ccclass } = _decorator;
@ccclass
export class SeDieResultPercentage extends ResultPercentage {
    calculateWinPercentage(originalChoices: string[], roundHistory: gc.RoundHistories.RoundHistory[]): Record<string, number> {
        const count = super.calculateWin(originalChoices, roundHistory);
        const total = roundHistory.length;

        // Initialize the percentage object
        const percentage: Record<string, number> = {};

        // Calculate red
        const oddValue = Math.round((count["odd"] * 100) / total);
        let red2Value = Math.round((count["red2"] * 100) / total);
        if (red2Value > oddValue) {
            red2Value = oddValue;
        }

        let red3Value = Math.round((count["red3"] * 100) / total);
        if (red3Value + red2Value > oddValue) {
            red3Value = oddValue - red2Value;
        }

        const red4Value = oddValue - (red2Value + red3Value);

        // Calculate white
        const evenValue = 100 - oddValue;
        let white3Value = Math.round((count["white3"] * 100) / total);
        if (white3Value > evenValue) {
            white3Value = evenValue;
        }
        const white4Value = evenValue - white3Value;

        // Assign calculated values to percentage object
        percentage["odd"] = oddValue;
        percentage["even"] = evenValue;
        percentage["red2"] = red2Value;
        percentage["red3"] = red3Value;
        percentage["red4"] = red4Value;
        percentage["white3"] = white3Value;
        percentage["white4"] = white4Value;

        return percentage;
    }
}
