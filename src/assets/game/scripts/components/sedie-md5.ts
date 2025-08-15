import { tween, UIOpacity, _decorator } from 'cc';
import MD5Component, { MD5Type } from 'db://shared-components/game/md5/scripts/md5-component';

const { ccclass } = _decorator;

export interface ExtraInfos {
    red1: boolean;
    red2: boolean;
    red3: boolean;
    red4: boolean;
}

@ccclass('SeDieMD5')
export class SeDieMD5 extends MD5Component {
    generateChips(totalRed: number): string {
        if (totalRed < 0 || totalRed > 4) return '';

        const chips = [];
        for (let i = 0; i < 4; i++) {
            chips.push(`<img src="chip_${i < totalRed ? 'do' : 'trang'}" />`);
        }
        return chips.join(' ');
    }

    generateMD5Result(data: MD5Type) {
        if (data.hashValue) {
            this.lblMd5Value && (this.lblMd5Value.string = data.hashValue);
        } else if (data.extraInfos) {
            const totalRed = Object.values(data.extraInfos).filter(Boolean).length;
            const chips = this.generateChips(totalRed);
            const value = data.rawValue.length > this.maximumStringAllowed
                ? data.rawValue.slice(0, this.lengthOfMd5) + "..."
                : data.rawValue;
            this.lblMd5Value && (this.lblMd5Value.string = `{${chips}}_${value}`);
        }
    }

    protected showTooltip() {
        if (this.tipString && this.md5Tip && !this.tipForHash) {
            this.md5Tip.setData(this.tipString);
            this.md5Tip.show(true);
            tween(this.md5Tip.node.getComponent(UIOpacity))
                .to(0.2, { opacity: 255 })
                .delay(2)
                .to(0.1, { opacity: 0 })
                .start();
        }
    }

    protected tipForHash: boolean = false;
}
