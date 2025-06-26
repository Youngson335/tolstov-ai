import gsap from "gsap";
import { SplitText } from "gsap/all";

gsap.registerPlugin(SplitText);

const lineText = ((elClass: string) => {
    document.fonts.ready.then(() => {
        gsap.set(elClass, { opacity: 1 });

        let split;
        SplitText.create(elClass, {
            type: "words,lines",
            linesClass: "line",
            autoSplit: true,
            mask: "lines",
            onSplit: (self) => {
            split = gsap.from(self.lines, {
                duration: 0.4,
                yPercent: 100,
                opacity: 0,
                stagger: 0.1,
                ease: "expo.out",
            });
            return split;
            }
        });

        if(split) {
            split.timeScale(0.4).play(0);
        };
    });
})

export default lineText;