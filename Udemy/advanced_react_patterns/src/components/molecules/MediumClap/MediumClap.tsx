import React, { useState, useEffect, useCallback, createContext, useMemo } from 'react';
// @ts-ignore
import mojs from 'mo-js';
import "./MediumClap.css";

type Context = {
    isClicked?: Boolean,
    count?: Number,
    countTotal?: Number,
    setRef?: (node: HTMLElement | null) => void
}

type RefElements = {
    clapEl: HTMLElement | undefined,
    clapCountEl: HTMLElement | undefined,
    clapTotalEl: HTMLElement | undefined
};

const useDOMRef = () => {
    const [{ clapRef, clapCountRef, clapTotalRef }, setRefState] = useState({
        clapRef: undefined,
        clapCountRef: undefined,
        clapTotalRef: undefined
    });

    const setRef = useCallback((node: HTMLElement | null) => {
        setRefState(prevRefState => ({
            ...prevRefState,
            [node!.dataset.refkey!]: node
        }))
    }, []);
    return { clapRef, clapCountRef, clapTotalRef, setRef };
}

const useClapAnimation = ({
    clapEl,
    clapCountEl,
    clapTotalEl
}: RefElements) => {
    const [animationTimeline, setAnimationTimeline] = useState(() => new mojs.Timeline());
    useEffect(() => {

        if (!clapEl || !clapCountEl || !clapTotalEl)
            return;

        const tlDuration = 300;
        const scaleButton = new mojs.Html({
            el: clapEl,
            duration: tlDuration,
            scale: { 1.3: 1 },
            easing: mojs.easing.ease.out
        });
        const triangleBurst = new mojs.Burst({
            parent: clapEl,
            radius: { 50: 95 },
            count: 5,
            angle: 30,
            children: {
                shape: 'polygon',
                radius: { 6: 0 },
                stroke: 'rgba(211,54,0,0.5)',
                strokeWidth: 2,
                angle: 210,
                delay: 30,
                speed: 0.2,
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1),
                duration: tlDuration
            }
        });
        const circleBurst = new mojs.Burst({
            parent: clapEl,
            radius: { 50: 75 },
            angle: 25,
            duration: tlDuration,
            children: {
                shape: 'circle',
                fill: "rgba(149,165,166,0.5)",
                delay: 30,
                speed: 0.2,
                radius: { 3: 0 },
                easing: mojs.easing.bezier(0.1, 1, 0.3, 1)
            }
        });
        const countAnimation = new mojs.Html({
            el: clapCountEl,
            opacity: { 0: 1 },
            y: { 0: -30 },
            duration: tlDuration
        }).then({
            opacity: { 1: 0 },
            y: -80,
            delay: tlDuration / 2
        });

        const countTotalAnimation = new mojs.Html({
            el: clapTotalEl,
            opacity: { 0: 1 },
            delay: (3 * tlDuration) / 2,
            duration: tlDuration,
            y: { 0: -3 }
        });

        clapEl.style.transform = 'scale(1,1)';

        const newAnimationTimeline = animationTimeline.add([
            scaleButton,
            countTotalAnimation,
            countAnimation,
            triangleBurst,
            circleBurst
        ]);
        setAnimationTimeline(newAnimationTimeline)
    }, [clapEl, clapCountEl, clapTotalEl]);
    return animationTimeline;
}

const INITIAL_STATE = {
    count: 0,
    countTotal: 201,
    isClicked: false
};

export const useClapState = (initialState = INITIAL_STATE) => {
    const MAXIMUM_USER_CLAP = 50;
    const [clapState, setClapState] = useState(initialState);
    const updateClapState = () => setClapState(({ count, countTotal }) => ({
        isClicked: true,
        count: Math.min(+count + 1, MAXIMUM_USER_CLAP),
        countTotal: count < MAXIMUM_USER_CLAP ? countTotal + 1 : countTotal
    }))

    const resetState = useCallback(() => {
        setClapState(initialState);
    }, []);

    return { clapState, updateClapState, resetState };
}



export const MediumClapContext: React.Context<Context> = createContext({});

const { Provider } = MediumClapContext;



const MediumClap: React.FC<{
    userStyles?: Object,
    className?: string,
    values?: Object,
    onClap?: () => void
}> = ({ children, userStyles, className = "", values, onClap, ...restProps }) => {
    const { clapState, updateClapState } = useClapState();
    const { clapRef, clapCountRef, clapTotalRef, setRef } = useDOMRef();
    const animationTimeline = useClapAnimation({
        clapEl: clapRef,
        clapCountEl: clapCountRef,
        clapTotalEl: clapTotalRef
    });
    const isControlled = !!values && !!onClap;

    const handleClapClick = () => {
        animationTimeline.replay();
        isControlled ? onClap() : updateClapState();
    }

    const getState = () => isControlled ? values : clapState
    const memoizedValue = useMemo(() => ({
        ...getState(),
        setRef
    }), [clapState, values, setRef]);
    return (
        <Provider value={memoizedValue}>
            <button
                ref={setRef}
                data-refkey="clapRef"
                className={`clap ${className}`}
                onClick={handleClapClick}
                type="button"
                style={userStyles}
                {...restProps}
            >
                {children}
            </button>
        </Provider>
    )
}

export default MediumClap;