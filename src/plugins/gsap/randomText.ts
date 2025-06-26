import gsap from "gsap";
import { SplitText } from "gsap/all";


gsap.registerPlugin(SplitText);

const randomText = ((elClass: string) => {
    document.fonts.ready.then(() => {
        gsap.set(elClass, { opacity: 1 });

        const split = SplitText.create(elClass, {
            type: "words",        
            wordDelimiter: String.fromCharCode(8205)
        });

        gsap.from(split.words, {
            y: -50,
            opacity: 0,
            rotation: "random(-20, 20)",
            stagger: 0.1,
            duration: 1,
            ease: "back"
        });        
    });    
})

export default randomText;
